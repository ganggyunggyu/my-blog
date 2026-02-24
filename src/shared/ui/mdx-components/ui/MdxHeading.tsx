import React from 'react';
import { cn } from '@/shared';
import { generateHeadingId } from '@/shared/ui/mdx-components/lib/heading-id';

type HeadingProps = React.ComponentPropsWithoutRef<'h1'>;
type HeadingWithIdProps = React.ComponentPropsWithoutRef<'h2'>;

export const MdxH1 = ({ className, ...props }: HeadingProps) => {
  return <h1 className={cn('text-4xl', 'font-bold', 'mb-4', 'mt-8', className)} {...props} />;
};

export const MdxH2 = ({ className, children, ...props }: HeadingWithIdProps) => {
  const id = generateHeadingId(children?.toString() ?? '');

  return (
    <h2
      id={id}
      className={cn('text-3xl', 'font-semibold', 'mb-3', 'mt-6', 'scroll-mt-20', className)}
      {...props}
    >
      {children}
    </h2>
  );
};

export const MdxH3 = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'h3'>) => {
  const id = generateHeadingId(children?.toString() ?? '');

  return (
    <h3
      id={id}
      className={cn('text-2xl', 'font-semibold', 'mb-2', 'mt-4', 'scroll-mt-20', className)}
      {...props}
    >
      {children}
    </h3>
  );
};
