'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const NAV_LINKS = [
  { href: '/', label: '홈' },
  { href: '/portfolio', label: '포트폴리오' },
  { href: '/posts', label: '포스트' },
  { href: '/editor', label: '에디터' },
] as const;

export const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 모바일 메뉴 열릴 때 스크롤 방지
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`vintage-border sticky top-0 z-50 backdrop-blur-sm bg-[var(--background)]/95 transition-all duration-300 ${
          scrolled ? 'shadow-lg py-2' : 'py-4'
        }`}
      >
        <nav className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold hover:text-[var(--accent)] transition-all duration-300 hover:scale-105"
          >
            gnggnggyu_log
          </Link>

          <div className="hidden md:flex items-center gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`vintage-button text-sm ${
                  isActive(link.href)
                    ? 'bg-[var(--accent)] text-[var(--background)] border-[var(--accent)]'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-2xl p-2 hover:bg-[var(--muted)] rounded transition-colors"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-64 bg-[var(--background)] border-l border-[var(--border)] shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">메뉴</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl p-2 hover:bg-[var(--muted)] rounded transition-colors"
                aria-label="메뉴 닫기"
              >
                <HiX />
              </button>
            </div>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left p-4 rounded-lg transition-all ${
                  isActive(link.href)
                    ? 'bg-[var(--accent)] text-[var(--background)]'
                    : 'hover:bg-[var(--muted)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-6 right-6 z-50 backdrop-blur-md bg-[var(--background)]/80 border border-[var(--border)] rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 h-[50px]">
        <ThemeToggle />
      </div>
    </>
  );
};
