"""Audit src/data/nba.json against its source data and against Basketball-Reference.

Checks:
  1. complete rosters: every team-season's player totals add up to the
     team's own totals (Team Totals.csv), so no player is missing
  2. traded seasons: the per-team rows of a traded player add up to his
     season total row, so splitting by team loses nothing
  3. pipeline: every line in nba.json equals sum(totals) / sum(games),
     recomputed here from the raw rows
  4. coverage: which franchise-decades exist, and that every NBA
     team-season since 1959-60 lands in one of them
  5. live spot check (--bbref N): every line of 30 stars plus N seeded random
     lines, recomputed from basketball-reference.com player pages

Usage: python3 scripts/audit_nba_data.py [--bbref 40]
"""

import csv
import html
import json
import os
import random
import re
import sys
import time
import urllib.request
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from build_nba_data import FIRST_SEASON, FRANCHISE, STL_BLK_FIRST  # noqa: E402

RAW = os.path.join(HERE, "..", ".cache", "raw")
BBREF_CACHE = os.path.join(HERE, "..", ".cache", "bbref")
DATA = os.path.join(HERE, "..", "src", "data", "nba.json")
TEAM_TOTALS_URL = "https://raw.githubusercontent.com/sumitrodatta/bball-reference-datasets/master/Data/Team%20Totals.csv"
STATS = ("pts", "trb", "ast", "stl", "blk")
LINE = {"pts": 2, "trb": 3, "ast": 4, "stl": 5, "blk": 6}
STARS = [
    "chambwi01", "russebi01", "westje01", "roberos01", "abdulka01", "ervinju01", "birdla01", "johnsma02",
    "jordami01", "olajuha01", "ewingpa01", "barklch01", "malonka01", "stockjo01", "oneilsh01", "duncati01",
    "bryanko01", "garneke01", "nowitdi01", "jamesle01", "curryst01", "duranke01", "antetgi01", "jokicni01",
    "doncilu01", "gilgesh01", "wembavi01", "pippesc01", "robinda01", "iversal01",
]


def num(x):
    try:
        return float(x)
    except (TypeError, ValueError):
        return None


def load_raw():
    rows = [r for r in csv.DictReader(open(os.path.join(RAW, "Player_Totals.csv"), encoding="utf-8")) if r["lg"] == "NBA"]
    tt = os.path.join(RAW, "Team_Totals.csv")
    if not os.path.exists(tt):
        urllib.request.urlretrieve(TEAM_TOTALS_URL, tt)
    teams = [r for r in csv.DictReader(open(tt, encoding="utf-8")) if r["lg"] == "NBA" and r["abbreviation"] not in ("", "NA")]
    return rows, teams


def check_rosters(rows, teams):
    by = defaultdict(lambda: defaultdict(float))
    for r in rows:
        if int(r["season"]) < FIRST_SEASON or r["team"] not in FRANCHISE:
            continue
        for s in STATS:
            by[(int(r["season"]), r["team"])][s] += num(r[s]) or 0.0
    issues, checked = [], 0
    for t in teams:
        season = int(t["season"])
        if season < FIRST_SEASON:
            continue
        key = (season, t["abbreviation"])
        checked += 1
        for s in STATS:
            if num(t[s]) is None:
                continue
            diff = by[key][s] - num(t[s])
            # through 1967-68 team rebounds were credited to the team, not to players
            if s == "trb" and season <= 1968:
                continue
            if abs(diff) > (20 if season <= 1968 else 2):
                issues.append("%d %s %s: players %d vs team %d" % (season, t["abbreviation"], s, by[key][s], num(t[s])))
    return checked, issues


def check_trades(rows):
    seasons = defaultdict(list)
    for r in rows:
        if int(r["season"]) >= FIRST_SEASON:
            seasons[(r["player_id"], r["season"])].append(r)
    issues, checked = [], 0
    for key, rs in seasons.items():
        tot = [r for r in rs if r["team"] in ("TOT",) or re.fullmatch(r"\dTM", r["team"])]
        parts = [r for r in rs if r["team"] in FRANCHISE]
        if not tot:
            continue
        checked += 1
        for s in ("g",) + STATS:
            if num(tot[0][s]) is None:
                continue
            if abs(sum(num(p[s]) or 0 for p in parts) - num(tot[0][s])) > 0.5:
                issues.append("%s %s %s: teams %s vs total %s" % (key[0], key[1], s, sum(num(p[s]) or 0 for p in parts), tot[0][s]))
    return checked, issues


def recompute(rows):
    agg = defaultdict(lambda: defaultdict(float))
    for r in rows:
        season = int(r["season"])
        if season < FIRST_SEASON or r["team"] not in FRANCHISE or not num(r["g"]):
            continue
        a = agg[(r["player_id"], FRANCHISE[r["team"]], season // 10 * 10)]
        a["g"] += num(r["g"])
        for s in STATS:
            a[s] += num(r[s]) or 0.0
        a["old"] = max(a["old"], 1.0 if season < STL_BLK_FIRST else 0.0)
    return agg


def check_pipeline(data, agg):
    issues, checked = [], 0
    for t in data["teams"]:
        dec = int(t["era"][:4])
        for p in t["players"]:
            a = agg.get((p[13], t["fr"], dec))
            checked += 1
            if not a:
                issues.append("%s %s: not in source" % (t["id"], p[0]))
                continue
            if int(a["g"]) != p[7]:
                issues.append("%s %s: games %d vs %d" % (t["id"], p[0], p[7], a["g"]))
            for s in STATS:
                if s in ("stl", "blk") and p[11]:
                    continue  # estimated
                want = round(a[s] / a["g"], 1)
                if abs(want - p[LINE[s]]) > 0.051:
                    issues.append("%s %s %s: %.1f vs %.1f" % (t["id"], p[0], s, p[LINE[s]], want))
    return checked, issues


def check_coverage(data, rows):
    cells = {(t["fr"], int(t["era"][:4])) for t in data["teams"]}
    needed = defaultdict(set)
    for r in rows:
        season = int(r["season"])
        if season >= FIRST_SEASON and r["team"] in FRANCHISE:
            needed[(FRANCHISE[r["team"]], season // 10 * 10)].add(season)
    missing = sorted(k for k in needed if k not in cells)
    return len(needed), missing


def bbref_table(pid):
    os.makedirs(BBREF_CACHE, exist_ok=True)
    path = os.path.join(BBREF_CACHE, pid + ".html")
    if not os.path.exists(path):
        req = urllib.request.Request("https://www.basketball-reference.com/players/%s/%s.html" % (pid[0], pid), headers={"User-Agent": "Mozilla/5.0 (Perfect Season data audit)"})
        with urllib.request.urlopen(req, timeout=30) as res:
            open(path, "wb").write(res.read())
        time.sleep(3.5)  # Basketball-Reference allows about 20 requests a minute
    page = open(path, encoding="utf-8").read()
    m = re.search(r'<table[^>]*id="totals_stats".*?</table>', page, re.S)
    if not m:
        return []
    body = m.group(0)[m.group(0).find("<tbody"):]
    out = []
    for tr in re.findall(r"<tr[^>]*>(.*?)</tr>", body, re.S):
        cells = {k: html.unescape(re.sub(r"<[^>]+>", "", v)).strip() for k, v in re.findall(r'<t[dh][^>]*data-stat="([^"]+)"[^>]*>(.*?)</t[dh]>', tr, re.S)}
        if cells.get("comp_name_abbr", "NBA") not in ("NBA", "") or not cells.get("year_id", "").strip():
            continue
        out.append(cells)
    return out


def check_bbref(data, n, seed=7):
    lines = []
    for t in data["teams"]:
        for p in t["players"]:
            lines.append((t, p))
    stars = [(t, p) for t, p in lines if p[13] in STARS and p[7] >= 40]
    rng = random.Random(seed)
    sample = stars + rng.sample([x for x in lines if x[1][7] >= 20 and x[1][13] not in STARS], n)
    issues, checked = [], 0
    for t, p in sample:
        rows = bbref_table(p[13])
        dec = int(t["era"][:4])
        agg = defaultdict(float)
        for r in rows:
            m = re.match(r"(\d{4})-(\d{2})", r.get("year_id", ""))
            team = r.get("team_name_abbr", "")
            if not m or team not in FRANCHISE or FRANCHISE[team] != t["fr"]:
                continue
            season = int(m.group(1)) + 1
            # the dataset ends with the last finished season; the site already has games from the one under way
            if season // 10 * 10 != dec or season > data["built"]:
                continue
            agg["g"] += num(r.get("games")) or 0
            for s, k in (("pts", "pts"), ("trb", "trb"), ("ast", "ast"), ("stl", "stl"), ("blk", "blk")):
                agg[s] += num(r.get(k)) or 0
        checked += 1
        if not agg["g"]:
            issues.append("%s %s: no matching seasons on Basketball-Reference" % (t["id"], p[0]))
            continue
        bad = []
        if int(agg["g"]) != p[7]:
            bad.append("G %d vs %d" % (p[7], agg["g"]))
        for s in STATS:
            if s in ("stl", "blk") and p[11]:
                continue
            want = round(agg[s] / agg["g"], 1)
            if abs(want - p[LINE[s]]) > 0.051:
                bad.append("%s %.1f vs %.1f" % (s.upper(), p[LINE[s]], want))
        status = "OK " if not bad else "BAD"
        print("  %s %-9s %-26s %s" % (status, t["id"], p[0][:26], ", ".join(bad) or "%d G  %.1f / %.1f / %.1f" % (p[7], p[2], p[3], p[4])))
        if bad:
            issues.append("%s %s: %s" % (t["id"], p[0], "; ".join(bad)))
    return checked, issues


def main():
    data = json.load(open(DATA, encoding="utf-8"))
    rows, teams = load_raw()
    failed = False

    def report(title, checked, issues, unit):
        nonlocal failed
        print("%s: %d %s checked, %d issue%s" % (title, checked, unit, len(issues), "" if len(issues) == 1 else "s"))
        for i in issues[:25]:
            print("   -", i)
        failed = failed or bool(issues)

    report("1. complete rosters", *check_rosters(rows, teams), "team-seasons")
    report("2. traded seasons", *check_trades(rows), "player-seasons")
    report("3. pipeline", *check_pipeline(data, recompute(rows)), "player lines")
    needed, missing = check_coverage(data, rows)
    report("4. coverage", needed, ["%s %ds has NBA seasons but no cell" % m for m in missing], "franchise-decades")
    if "--bbref" in sys.argv:
        n = int(sys.argv[sys.argv.index("--bbref") + 1])
        print("5. Basketball-Reference spot check (star lines + %d random lines):" % n)
        report("   result", *check_bbref(data, n), "lines")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
