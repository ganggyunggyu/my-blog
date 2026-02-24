'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/shared';
import { MdxH1, MdxH2, MdxH3 } from '@/shared/ui/mdx-components/ui/MdxHeading';
import { MdxImage } from '@/shared/ui/mdx-components/ui/MdxImage';
import { MdxPre } from '@/shared/ui/mdx-components/ui/MdxPre';

const MdxParagraph = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) => {
  return <p className={cn('mb-4', 'leading-7', className)} {...props} />;
};

const MdxAnchor = ({
  href,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'a'>) => {
  const sharedClassName = cn('text-[var(--accent)]', 'hover:underline', className);

  if (href?.startsWith('/')) {
    return <Link href={href} className={sharedClassName} {...props} />;
  }

  return (
    <a
      href={href}
      className={sharedClassName}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
};

const MdxCode = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'code'>) => {
  const isInline = !className;

  if (isInline) {
    return (
      <code
        className={cn(
          'bg-[var(--muted)]',
          'text-[var(--accent)]',
          'px-1.5',
          'py-0.5',
          'rounded',
          'text-sm',
          'font-mono',
          'font-semibold',
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <code className={cn(className)} {...props}>
      {children}
    </code>
  );
};

const MdxUnorderedList = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'ul'>) => {
  return <ul className={cn('list-disc', 'pl-6', 'mb-4', 'space-y-2', className)} {...props} />;
};

const MdxOrderedList = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'ol'>) => {
  return (
    <ol className={cn('list-decimal', 'pl-6', 'mb-4', 'space-y-2', className)} {...props} />
  );
};

const MdxListItem = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'li'>) => {
  return <li className={cn('leading-7', className)} {...props} />;
};

const MdxBlockquote = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'blockquote'>) => {
  return (
    <blockquote
      className={cn(
        'border-l-4',
        'border-[var(--accent)]',
        'pl-4',
        'italic',
        'my-6',
        'opacity-80',
        className
      )}
      {...props}
    />
  );
};

const MdxTable = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'table'>) => {
  return (
    <div className={cn('overflow-x-auto', 'my-6')}>
      <table className={cn('w-full', 'border-collapse', className)} {...props} />
    </div>
  );
};

const MdxTableHeader = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'th'>) => {
  return (
    <th
      className={cn(
        'border',
        'border-[var(--border)]',
        'bg-[var(--muted)]',
        'px-4',
        'py-2',
        'text-left',
        'font-semibold',
        className
      )}
      {...props}
    />
  );
};

const MdxTableCell = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'td'>) => {
  return <td className={cn('border', 'border-[var(--border)]', 'px-4', 'py-2', className)} {...props} />;
};

export const MDXComponents = {
  h1: MdxH1,
  h2: MdxH2,
  h3: MdxH3,
  p: MdxParagraph,
  a: MdxAnchor,
  img: MdxImage,
  code: MdxCode,
  pre: MdxPre,
  ul: MdxUnorderedList,
  ol: MdxOrderedList,
  li: MdxListItem,
  blockquote: MdxBlockquote,
  table: MdxTable,
  th: MdxTableHeader,
  td: MdxTableCell,
};
