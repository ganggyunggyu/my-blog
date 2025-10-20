'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi2';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      setIsAnimating(false);
    }, 150);
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={handleToggle}
      className="relative overflow-hidden w-[24px] h-[24px]"
      aria-label="Toggle theme"
      title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    >
      <span
        className={`inline-flex items-center justify-center transition-all duration-300 ${
          isAnimating ? 'rotate-180 scale-0' : 'rotate-0 scale-100'
        }`}
      >
        {theme === 'dark' ? (
          <HiSun
            className="text-[var(--accent)]"
            style={{ width: '24px', height: '24px' }}
          />
        ) : (
          <HiMoon
            className="text-[var(--accent)]"
            style={{ width: '24px', height: '24px' }}
          />
        )}
      </span>
    </button>
  );
}
