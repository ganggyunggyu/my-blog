"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
      setTheme(theme === "dark" ? "light" : "dark");
      setIsAnimating(false);
    }, 150);
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={handleToggle}
      className="vintage-button text-sm relative overflow-hidden"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Light Mode" : "Dark Mode"}
    >
      <span
        className={`inline-block transition-all duration-300 ${
          isAnimating ? 'rotate-180 scale-0' : 'rotate-0 scale-100'
        }`}
      >
        {theme === "dark" ? "☀" : "☾"}
      </span>
    </button>
  );
}
