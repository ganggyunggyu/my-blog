'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/shared';

type MdxImageProps = React.ComponentPropsWithoutRef<'img'>;

export const MdxImage = ({ src, alt, className }: MdxImageProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const imageSrc = (src as string) || '';
  const imageAlt = alt || '';

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={800}
        height={600}
        className={cn(
          'rounded-lg',
          'my-8',
          'cursor-pointer',
          'hover:opacity-90',
          'transition-opacity',
          className
        )}
        style={{ maxWidth: '100%', height: 'auto' }}
        onClick={handleOpen}
      />
      {isOpen && (
        <div
          className={cn(
            'fixed',
            'inset-0',
            'bg-black/80',
            'z-50',
            'flex',
            'items-center',
            'justify-center',
            'p-4'
          )}
          onClick={handleClose}
        >
          <div className={cn('relative', 'max-w-7xl', 'max-h-[90vh]')}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1920}
              height={1080}
              className={cn('rounded-lg')}
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                height: 'auto',
                width: 'auto',
              }}
            />
            <button
              className={cn(
                'absolute',
                'top-4',
                'right-4',
                'text-white',
                'bg-black/50',
                'hover:bg-black/70',
                'rounded-full',
                'w-10',
                'h-10',
                'flex',
                'items-center',
                'justify-center',
                'transition-colors'
              )}
              onClick={handleClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
