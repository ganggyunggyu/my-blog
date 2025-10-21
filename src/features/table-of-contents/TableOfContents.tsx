'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = document.querySelectorAll('.prose h2, .prose h3');
    const headingData: Heading[] = Array.from(elements).map((elem, index) => ({
      id: elem.id || `heading-${index}`,
      text: elem.textContent || '',
      level: parseInt(elem.tagName[1]),
    }));

    setHeadings(headingData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block fixed right-8 top-32 w-64 max-h-[calc(100vh-10rem)] overflow-y-auto">
      <h3 className="font-bold mb-4 text-sm opacity-70">목차</h3>
      <ul className="space-y-2 text-sm">
        {headings.map(({ id, text, level }, index) => (
          <li key={`${id}-${index}`} style={{ paddingLeft: `${(level - 2) * 1}rem` }}>
            <a
              href={`#${id}`}
              className={`block py-1 transition-all hover:text-[var(--accent)] ${
                activeId === id
                  ? 'text-[var(--accent)] font-semibold border-l-2 border-[var(--accent)] pl-2'
                  : 'opacity-70 hover:opacity-100'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
