"""Build the NBA player database for Perfect Season.

Source: per-season, per-team player totals from the public
sumitrodatta/bball-reference-datasets repo (Basketball-Reference data).

Output: src/data/nba.json with
  teams:   franchise-decade cells, each with its players' games-weighted
           per-game averages for that team in that decade
  playoff: historical great teams used as playoff opponents

Rules (see research/perfect-season/SPEC.md §11):
  - NBA only (no ABA/BAA), seasons ending 1960..latest
  - a season belongs to the decade it ENDS in (1989-90 -> 1990s)
  - a cell is (franchise, decade); it is labelled with the franchise's
    dominant name in that decade (most seasons; ties go to the later name)
  - stats are sum(totals) / sum(games) over every season of that player
    with that franchise in that decade; traded-season "2TM"/"TOT" rows skipped
  - steals/blocks before 1973-74 are estimated from a regression on the
    player's other per-game stats and position, and flagged
  - positions are every position the player was listed at in a season
    with 10+ games, across his career
  - prime = the player's best cell (20+ games) by rating value

Usage: python3 scripts/build_nba_data.py [raw_dir]
"""

import csv
import json
import os
import sys
import urllib.request
from collections import defaultdict

import numpy as np

BASE = "https://raw.githubusercontent.com/sumitrodatta/bball-reference-datasets/master/Data/"
FILES = {"totals": "Player Totals.csv", "teams": "Team Summaries.csv"}
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "src", "data", "nba.json")
FIRST_SEASON = 1960
STL_BLK_FIRST = 1974
W = {"pts": 0.33, "reb": 0.67, "ast": 0.64, "stl": 1.2, "blk": 1.13}

# B-Ref abbreviation -> franchise id
FRANCHISE = {
    "STL": "ATL", "ATL": "ATL",
    "BOS": "BOS",
    "NYN": "BKN", "NJN": "BKN", "BRK": "BKN",
    "CHH": "CHA", "CHA": "CHA", "CHO": "CHA",
    "CHI": "CHI", "CLE": "CLE", "DAL": "DAL", "DEN": "DEN", "DET": "DET",
    "PHW": "GSW", "SFW": "GSW", "GSW": "GSW",
    "SDR": "HOU", "HOU": "HOU",
    "IND": "IND",
    "BUF": "LAC", "SDC": "LAC", "LAC": "LAC",
    "MNL": "LAL", "LAL": "LAL",
    "VAN": "MEM", "MEM": "MEM",
    "MIA": "MIA", "MIL": "MIL", "MIN": "MIN",
    "NOH": "NOP", "NOK": "NOP", "NOP": "NOP",
    "NYK": "NYK",
    "SEA": "OKC", "OKC": "OKC",
    "ORL": "ORL",
    "SYR": "PHI", "PHI": "PHI",
    "PHO": "PHX",
    "POR": "POR",
    "CIN": "SAC", "KCO": "SAC", "KCK": "SAC", "SAC": "SAC",
    "SAS": "SAS", "TOR": "TOR",
    "NOJ": "UTA", "UTA": "UTA",
    "CHP": "WAS", "CHZ": "WAS", "BAL": "WAS", "CAP": "WAS", "WSB": "WAS", "WAS": "WAS",
}

# B-Ref abbreviation -> (display abbreviation, primary color, secondary color)
IDENTITY = {
    "STL": ("STL", "#C8102E", "#FDB927"), "ATL": ("ATL", "#E03A3E", "#C1D32F"),
    "BOS": ("BOS", "#007A33", "#BA9653"),
    "NYN": ("NYN", "#E31837", "#1D428A"), "NJN": ("NJN", "#C8102E", "#003DA5"), "BRK": ("BKN", "#000000", "#FFFFFF"),
    "CHH": ("CHH", "#00788C", "#1D1160"), "CHA": ("CHA", "#F26532", "#002B5C"), "CHO": ("CHA", "#00788C", "#1D1160"),
    "CHI": ("CHI", "#CE1141", "#000000"), "CLE": ("CLE", "#6F263D", "#FFB81C"), "DAL": ("DAL", "#00538C", "#B8C4CA"),
    "DEN": ("DEN", "#0E2240", "#FEC524"), "DET": ("DET", "#C8102E", "#1D42BA"),
    "PHW": ("PHW", "#1D428A", "#FFC72C"), "SFW": ("SFW", "#1D428A", "#FFC72C"), "GSW": ("GSW", "#1D428A", "#FFC72C"),
    "SDR": ("SDR", "#006A4E", "#FDB927"), "HOU": ("HOU", "#CE1141", "#C4CED4"),
    "IND": ("IND", "#002D62", "#FDBB30"),
    "BUF": ("BUF", "#F47B20", "#00338D"), "SDC": ("SDC", "#1D428A", "#F58426"), "LAC": ("LAC", "#1D428A", "#C8102E"),
    "MNL": ("MNL", "#1D428A", "#FDB927"), "LAL": ("LAL", "#552583", "#FDB927"),
    "VAN": ("VAN", "#00B2A9", "#BC7844"), "MEM": ("MEM", "#5D76A9", "#12173F"),
    "MIA": ("MIA", "#98002E", "#F9A01B"), "MIL": ("MIL", "#00471B", "#EEE1C6"), "MIN": ("MIN", "#0C2340", "#78BE20"),
    "NOH": ("NOH", "#00788C", "#1D1160"), "NOK": ("NOK", "#00788C", "#1D1160"), "NOP": ("NOP", "#0C2340", "#C8102E"),
    "NYK": ("NYK", "#006BB6", "#F58426"),
    "SEA": ("SEA", "#00653A", "#FFC200"), "OKC": ("OKC", "#007AC1", "#EF3B24"),
    "ORL": ("ORL", "#0077C0", "#C4CED4"),
    "SYR": ("SYR", "#1D428A", "#ED174C"), "PHI": ("PHI", "#006BB6", "#ED174C"),
    "PHO": ("PHX", "#1D1160", "#E56020"), "POR": ("POR", "#E03A3E", "#000000"),
    "CIN": ("CIN", "#0046AD", "#E31837"), "KCO": ("KCO", "#0046AD", "#E31837"), "KCK": ("KCK", "#0046AD", "#E31837"), "SAC": ("SAC", "#5A2D81", "#63727A"),
    "SAS": ("SAS", "#000000", "#C4CED4"), "TOR": ("TOR", "#CE1141", "#000000"),
    "NOJ": ("NOJ", "#5A2D81", "#FDB927"), "UTA": ("UTA", "#002B5C", "#F9A01B"),
    "CHP": ("CHP", "#002B5C", "#E31837"), "CHZ": ("CHZ", "#002B5C", "#E31837"), "BAL": ("BAL", "#002B5C", "#E31837"),
    "CAP": ("CAP", "#002B5C", "#E31837"), "WSB": ("WSB", "#002B5C", "#E31837"), "WAS": ("WAS", "#002B5C", "#E31837"),
}


def fetch(raw_dir):
    os.makedirs(raw_dir, exist_ok=True)
    paths = {}
    for key, name in FILES.items():
        path = os.path.join(raw_dir, name.replace(" ", "_"))
        if not os.path.exists(path):
            print("downloading", name)
            urllib.request.urlretrieve(BASE + name.replace(" ", "%20"), path)
        paths[key] = path
    return paths


def num(x):
    try:
        return float(x)
    except (TypeError, ValueError):
        return None


def pos_group(pos):
    p = pos.split("-")[0]
    if p in ("PG", "SG", "G"):
        return 0
    if p in ("SF", "PF", "F"):
        return 1
    return 2


def norm_positions(pos):
    out = []
    for p in pos.replace("/", "-").split("-"):
        p = p.strip().upper()
        if p == "G":
            out += ["PG", "SG"]
        elif p == "F":
            out += ["SF", "PF"]
        elif p in ("PG", "SG", "SF", "PF", "C"):
            out.append(p)
    return out


def fit_estimators(rows):
    """Least-squares models for per-game steals and blocks from 1974-1985 seasons."""
    xs_s, ys_s, xs_b, ys_b = [], [], [], []
    for r in rows:
        if not (STL_BLK_FIRST <= r["season"] <= 1985) or r["g"] < 20:
            continue
        g = r["g"]
        ppg, rpg, apg = r["pts"] / g, r["reb"] / g, r["ast"] / g
        grp = pos_group(r["pos"])
        feats = [1.0, ppg, rpg, apg, 1.0 if grp == 0 else 0.0, 1.0 if grp == 2 else 0.0]
        xs_s.append(feats); ys_s.append(r["stl"] / g)
        xs_b.append(feats); ys_b.append(r["blk"] / g)
    ws = np.linalg.lstsq(np.array(xs_s), np.array(ys_s), rcond=None)[0]
    wb = np.linalg.lstsq(np.array(xs_b), np.array(ys_b), rcond=None)[0]
    return ws, wb


def main():
    raw_dir = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "..", ".cache", "raw")
    paths = fetch(raw_dir)

    rows = []
    positions = defaultdict(set)
    for r in csv.DictReader(open(paths["totals"], encoding="utf-8")):
        if r["lg"] != "NBA" or r["team"] not in FRANCHISE:
            continue
        season = int(r["season"])
        g = num(r["g"]) or 0
        if g <= 0:
            continue
        if g >= 10:
            for p in norm_positions(r["pos"]):
                positions[r["player_id"]].add(p)
        if season < FIRST_SEASON:
            continue
        rows.append({
            "season": season, "pid": r["player_id"], "name": r["player"], "team": r["team"], "pos": r["pos"],
            "g": g, "pts": num(r["pts"]) or 0.0, "reb": num(r["trb"]) or 0.0, "ast": num(r["ast"]) or 0.0,
            "stl": num(r["stl"]), "blk": num(r["blk"]),
        })

    ws, wb = fit_estimators(rows)
    for r in rows:
        r["est"] = False
        if r["stl"] is None or r["blk"] is None:
            g = r["g"]
            grp = pos_group(r["pos"])
            feats = np.array([1.0, r["pts"] / g, r["reb"] / g, r["ast"] / g, 1.0 if grp == 0 else 0.0, 1.0 if grp == 2 else 0.0])
            if r["stl"] is None:
                r["stl"] = max(0.0, float(feats @ ws)) * g
            if r["blk"] is None:
                r["blk"] = max(0.0, float(feats @ wb)) * g
            r["est"] = True

    # team-season records (for labels and playoff opponents)
    team_seasons = {}
    for r in csv.DictReader(open(paths["teams"], encoding="utf-8")):
        if r["lg"] != "NBA" or r["abbreviation"] not in FRANCHISE:
            continue
        team_seasons[(int(r["season"]), r["abbreviation"])] = {
            "name": r["team"], "w": int(float(r["w"])), "l": int(float(r["l"])), "playoffs": r["playoffs"] == "TRUE",
        }

    # dominant identity per (franchise, decade)
    seasons_by = defaultdict(lambda: defaultdict(set))
    for r in rows:
        fr = FRANCHISE[r["team"]]
        seasons_by[(fr, r["season"] // 10 * 10)][r["team"]].add(r["season"])
    identity = {}
    for key, by_abbr in seasons_by.items():
        abbr = sorted(by_abbr, key=lambda a: (len(by_abbr[a]), max(by_abbr[a])))[-1]
        name = None
        for s in sorted(by_abbr[abbr], reverse=True):
            if (s, abbr) in team_seasons:
                name = team_seasons[(s, abbr)]["name"]
                break
        all_seasons = sorted(set().union(*by_abbr.values()))
        identity[key] = {"abbr": abbr, "name": name or abbr, "first": all_seasons[0], "last": all_seasons[-1], "n": len(all_seasons)}

    # aggregate per (player, franchise, decade)
    agg = {}
    for r in rows:
        fr = FRANCHISE[r["team"]]
        key = (r["pid"], fr, r["season"] // 10 * 10)
        a = agg.setdefault(key, {"name": r["name"], "g": 0.0, "pts": 0.0, "reb": 0.0, "ast": 0.0, "stl": 0.0, "blk": 0.0, "seasons": set(), "est": False})
        a["g"] += r["g"]
        for k in ("pts", "reb", "ast", "stl", "blk"):
            a[k] += r[k]
        a["seasons"].add(r["season"])
        a["est"] = a["est"] or r["est"]

    def line(a):
        g = a["g"]
        return {k: a[k] / g for k in ("pts", "reb", "ast", "stl", "blk")}

    def value(s):
        return sum(s[k] * W[k] for k in W)

    # prime line per player
    prime = {}
    for (pid, fr, dec), a in agg.items():
        if a["g"] < 20:
            continue
        s = line(a)
        v = value(s)
        if pid not in prime or v > prime[pid][0]:
            prime[pid] = (v, fr, dec)

    cells = defaultdict(list)
    for (pid, fr, dec), a in agg.items():
        cells[(fr, dec)].append((pid, a))

    teams = []
    for (fr, dec) in sorted(cells):
        ident = identity[(fr, dec)]
        disp, c1, c2 = IDENTITY[ident["abbr"]]
        plist = []
        for pid, a in cells[(fr, dec)]:
            s = line(a)
            pos = sorted(positions.get(pid) or norm_positions("C"), key=["PG", "SG", "SF", "PF", "C"].index)
            pr = prime.get(pid)
            pr_ref = None
            if pr and (pr[1], pr[2]) != (fr, dec):
                pr_ref = pr[1] + "-" + str(pr[2])
            seas = sorted(a["seasons"])
            plist.append([
                a["name"], "/".join(pos), round(s["pts"], 1), round(s["reb"], 1), round(s["ast"], 1),
                round(s["stl"], 1), round(s["blk"], 1), int(a["g"]), len(seas), seas[0], seas[-1],
                1 if a["est"] else 0, pr_ref, pid,
            ])
        plist.sort(key=lambda p: -(p[2] * W["pts"] + p[3] * W["reb"] + p[4] * W["ast"] + p[5] * W["stl"] + p[6] * W["blk"]))
        if len(plist) < 6:
            continue
        teams.append({
            "id": fr + "-" + str(dec), "fr": fr, "abbr": disp, "name": ident["name"], "era": str(dec) + "s",
            "c1": c1, "c2": c2, "from": ident["first"], "to": ident["last"], "players": plist,
        })

    # playoff opponents: great real teams, normalised to 82 games
    playoff = []
    best_player = {}
    for (pid, fr, dec), a in agg.items():
        pass
    season_best = {}
    for r in rows:
        if r["g"] < 30:
            continue
        g = r["g"]
        v = value({k: r[k] / g for k in W})
        key = (r["season"], r["team"])
        if key not in season_best or v > season_best[key][0]:
            season_best[key] = (v, r["name"])
    for (season, abbr), t in team_seasons.items():
        if season < FIRST_SEASON:
            continue
        games = t["w"] + t["l"]
        if games < 50:
            continue
        w82 = round(t["w"] * 82 / games)
        if w82 < 53:
            continue
        disp, c1, c2 = IDENTITY[abbr]
        star = season_best.get((season, abbr), (0, ""))[1]
        playoff.append({
            "year": str(season - 1) + "-" + str(season)[2:], "team": t["name"], "abbr": disp, "w": t["w"], "l": t["l"],
            "w82": w82, "c1": c1, "star": star,
        })
    playoff.sort(key=lambda x: (-x["w82"], x["year"]))

    out = {
        "source": "Basketball-Reference via github.com/sumitrodatta/bball-reference-datasets",
        "built": max(r["season"] for r in rows),
        "fields": ["name", "pos", "pts", "reb", "ast", "stl", "blk", "g", "seasons", "from", "to", "est", "prime", "pid"],
        "teams": teams,
        "playoff": playoff,
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
    n_players = sum(len(t["players"]) for t in teams)
    print("teams", len(teams), "player-lines", n_players, "playoff teams", len(playoff), "bytes", os.path.getsize(OUT))
    print("stl model", np.round(ws, 3), "blk model", np.round(wb, 3))


if __name__ == "__main__":
    main()
