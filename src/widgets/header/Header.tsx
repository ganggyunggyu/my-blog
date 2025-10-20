'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { useEffect, useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`vintage-border sticky top-0 z-10 backdrop-blur-sm bg-[var(--background)]/95 transition-all duration-300 ${
        scrolled ? 'shadow-lg py-2' : 'py-4'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold hover:text-[var(--accent)] transition-all duration-300 hover:scale-105"
        >
          감겸규.log
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className={`vintage-button text-sm ${
              isActive('/') && pathname === '/' ? 'bg-[var(--accent)] text-[var(--background)] border-[var(--accent)]' : ''
            }`}
          >
            홈
          </Link>
          <Link
            href="/posts"
            className={`vintage-button text-sm ${
              isActive('/posts') ? 'bg-[var(--accent)] text-[var(--background)] border-[var(--accent)]' : ''
            }`}
          >
            포스트
          </Link>
          <Link
            href="/editor"
            className={`vintage-button text-sm ${
              isActive('/editor') ? 'bg-[var(--accent)] text-[var(--background)] border-[var(--accent)]' : ''
            }`}
          >
            에디터
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
