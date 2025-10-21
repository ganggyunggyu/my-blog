'use client';

import { useEffect, useState } from 'react';

interface Props {
  text: string;
  speed?: number;
  className?: string;
}

export const TypingAnimation = ({ text, speed = 50, className = '' }: Props) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <figure className={`whitespace-pre-line ${className}`}>
      {displayText}
      {currentIndex < text.length && (
        <p className="inline-block w-0.5 h-5 bg-current ml-1 animate-pulse" />
      )}
    </figure>
  );
};
