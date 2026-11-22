import type { Photo } from '../types';

export const studySubjects = {
  1: { jessa: 'Jessa', trent: 'Trent', jules: 'Jules' },
  2: { nora: 'Nora', greg: 'Greg', tiffani: 'Tiffani' },
  3: { dana: 'Dana', doug: 'Doug', rafe: 'Rafe' },
  4: { tanner: 'Tanner', kenna: 'Kenna', riley: 'Riley', deb: 'Deb', brody: 'Brody', marcus: 'Marcus', kyle: 'Kyle', sienna: 'Sienna', alexis: 'Alexis', tash: 'Tash' },
  5: { mara: 'Mara', ellis: 'Ellis', theo: 'Theo', nico: 'Nico', bea: 'Bea', lena: 'Lena', dez: 'Dez' },
  6: { sofia: 'Sofia', daniel: 'Daniel', iris: 'Iris', cal: 'Cal', neve: 'Neve', dez: 'Dez' },
};

export const studyKey = (caseNumber: keyof typeof studySubjects, subject: string): string => `cg${caseNumber}_study_${subject}`;

export function portraitStudies(caseNumber: keyof typeof studySubjects, t: string): Photo[] {
  return Object.entries(studySubjects[caseNumber]).map(([subject, name]) => {
    const art = studyKey(caseNumber, subject);
    return { id: art, art, t, place: 'Digital sketchbook', orientation: 'portrait', hidden: true, caption: `Upper-body figure study · ${name}` };
  });
}
