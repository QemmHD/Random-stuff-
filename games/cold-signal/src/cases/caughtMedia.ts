export const encounterLabels = {
  1: ['Paint jars and a half-painted lighthouse', 'Jessa and Jules kiss by the easels', 'Jessa and Jules pull apart'],
  2: ['Bowling shoes just inside Room 6', 'Greg and Tiffani kiss inside Room 6', 'Tiffani turns toward the door'],
  3: ['Dana and Rafe by the television', 'Dana pulls Rafe into a kiss', 'The two step apart by the bed'],
  4: ['Tanner and Kenna by the window', 'Tanner and Kenna kiss', 'The pilates ring hangs from the bedpost'],
  5: ['Mara and Theo at the kitchen counter', 'Mara and Theo kiss at her kitchen counter', 'The kitchen drawer is still open'],
  6: ['Cal and Sofia beside the garment bag', 'Sofia and Cal kiss in room 608', 'Sofia pulls away beside the suit bag'],
} as const;

export type EncounterChapter = keyof typeof encounterLabels;

export function encounterFrames(chapter: EncounterChapter) {
  return encounterLabels[chapter].map((label, i) => ({ art: `cg${chapter}_encounter_${i}`, label, reveal: i === 1 }));
}
