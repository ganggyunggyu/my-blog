'use client';

import React from 'react';
import { cn } from '@/shared';

const getLanguage = (children: React.ReactNode): string | null => {
  const [firstChild] = React.Children.toArray(children);

  if (!React.isValidElement(firstChild)) {
    return null;
  }

  const className =
    typeof firstChild.props?.className === 'string' ? firstChild.props.className : '';
  const match = className.match(/language-(\w+)/);

  return match ? match[1] : null;
};

const getTextContent = (node: React.ReactNode): string => {
  if (typeof node === 'string') {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join('');
  }

  if (React.isValidElement(node)) {
    return getTextContent(node.props.children);
  }

  return '';
};

export const MdxPre = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'pre'>) => {
  const [copied, setCopied] = React.useState(false);
  const language = getLanguage(children);

  const handleCopy = () => {
    const code = getTextContent(children);
    navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('relative', 'group', 'my-6')}>
      {language && (
        <div
          className={cn(
            'absolute',
            'top-0',
            'left-0',
            'px-3',
            'py-1',
            'bg-[var(--accent)]',
            'text-white',
            'text-xs',
            'font-medium',
            'rounded-tl-lg',
            'rounded-br-lg',
            'z-10'
          )}
        >
          {language.toUpperCase()}
        </div>
      )}
      <pre
        className={cn('rounded-lg', 'p-4', 'overflow-x-auto', className)}
        style={{
          paddingTop: language ? '2.5rem' : '1rem',
          backgroundColor: 'var(--code-bg)',
        }}
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className={cn(
          'absolute',
          'top-3',
          'right-3',
          'px-3',
          'py-1.5',
          'text-xs',
          'font-medium',
          'bg-[var(--background)]',
          'text-[var(--foreground)]',
          'border',
          'border-[var(--border)]',
          'rounded',
          'shadow-sm',
          'opacity-0',
          'group-hover:opacity-100',
          'transition-all',
          'duration-200',
          'hover:bg-[var(--accent)]',
          'hover:text-white',
          'hover:border-[var(--accent)]',
          'z-10'
        )}
        aria-label="Copy code"
      >
        {copied ? '✓ 복사됨' : '복사'}
      </button>
    </div>
  );
};
