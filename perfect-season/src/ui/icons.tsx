import React from 'react';

type P = { size?: number; color?: string };
const S = (props: P & { children: React.ReactNode; stroke?: number }) => (
  <svg width={props.size ?? 20} height={props.size ?? 20} viewBox="0 0 24 24" fill="none" stroke={props.color ?? 'currentColor'} strokeWidth={props.stroke ?? 2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {props.children}
  </svg>
);

export const Back = (p: P) => (
  <S {...p} stroke={2.5}>
    <path d="M15 18l-6-6 6-6" />
  </S>
);
export const Down = (p: P) => (
  <S {...p} stroke={2.6}>
    <path d="M6 9l6 6 6-6" />
  </S>
);
export const Refresh = (p: P) => (
  <S {...p} stroke={2.4}>
    <path d="M20 11a8 8 0 0 0-14.9-3M4 4v4h4M4 13a8 8 0 0 0 14.9 3M20 20v-4h-4" />
  </S>
);
export const Lock = (p: P) => (
  <S {...p} stroke={2.4}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </S>
);
export const Crown = (p: P) => (
  <S {...p} stroke={2.2}>
    <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z" />
  </S>
);
export const Trophy = (p: P) => (
  <S {...p}>
    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z" />
    <path d="M17 6h3a3 3 0 0 1-3 4M7 6H4a3 3 0 0 0 3 4" />
  </S>
);
export const Share = (p: P) => (
  <S {...p}>
    <path d="M12 3v12M7 8l5-5 5 5" />
    <path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
  </S>
);
export const Gear = (p: P) => (
  <S {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </S>
);
export const Help = (p: P) => (
  <S {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" />
  </S>
);
export const Home = (p: P) => (
  <S {...p}>
    <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
  </S>
);
export const Calendar = (p: P) => (
  <S {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </S>
);
export const Ranks = (p: P) => (
  <S {...p}>
    <path d="M6 20V11M12 20V4M18 20v-6" />
  </S>
);
export const Bolt = (p: P) => (
  <S {...p}>
    <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
  </S>
);
export const User = (p: P) => (
  <S {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
  </S>
);
export const Coin = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#F5B83D" />
    <circle cx="12" cy="12" r="6" fill="none" stroke="#9A6A06" strokeWidth="2" />
  </svg>
);
