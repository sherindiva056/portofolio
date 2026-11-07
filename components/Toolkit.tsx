'use client';

import { useState } from 'react';

const tools = [
  {
    name: 'Figma',
    logo: <g transform="translate(2.5 2.5) scale(.9)"><path fill="#F24E1E" d="M10 0a5 5 0 0 0 0 10h5V0z"/><path fill="#FF7262" d="M15 0h5a5 5 0 0 1 0 10h-5z"/><path fill="#A259FF" d="M10 10a5 5 0 0 0 0 10h5V10z"/><circle fill="#1ABCFE" cx="20" cy="15" r="5"/><path fill="#0ACF83" d="M10 20a5 5 0 1 0 5 5v-5z"/></g>,
  },
  {
    name: 'JavaScript',
    logo: <><rect x="2" y="2" width="28" height="28" rx="5" fill="#F7DF1E"/><text x="27" y="25" textAnchor="end" fontSize="15" fontWeight="800" fill="#171717">JS</text></>,
  },
  {
    name: 'TypeScript',
    logo: <><rect x="2" y="2" width="28" height="28" rx="5" fill="#3178C6"/><text x="27" y="25" textAnchor="end" fontSize="15" fontWeight="800" fill="white">TS</text></>,
  },
  {
    name: 'React',
    logo: <g stroke="#087EA4" strokeWidth="1.6" fill="none"><ellipse cx="16" cy="16" rx="14" ry="5.5"/><ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(120 16 16)"/><circle cx="16" cy="16" r="2.5" fill="#087EA4" stroke="none"/></g>,
  },
  {
    name: 'Next.js',
    logo: <><circle cx="16" cy="16" r="14" fill="#16181D"/><path d="M10 23V10l14 17M22 10v10" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
  },
  {
    name: 'Google Sheets',
    logo: <><path d="M8 2h11l7 7v19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" fill="#0F9D58"/><path d="M19 2v7h7z" fill="#87CEAC"/><path d="M11 14h10v10H11zM11 19h10m-5-5v10" fill="none" stroke="white" strokeWidth="1.3"/></>,
  },
];

export default function Toolkit() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <ul className="toolkit-list" aria-label="Tools yang aku pakai">
      {tools.map(({ name, logo }) => (
        <li key={name}>
          <button
            type="button"
            aria-label={name}
            aria-pressed={active === name}
            onClick={() => setActive(current => current === name ? null : name)}
            onBlur={() => setActive(null)}
          >
            <svg viewBox="0 0 32 32" aria-hidden="true">{logo}</svg>
            <span className="toolkit-label" aria-hidden="true">{name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
