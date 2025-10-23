'use client';

import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithoutRef, useState } from "react";

const usedIds = new Set<string>();

const generateUniqueId = (text: string): string => {
  const baseId = text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w가-힣-]/g, '');

  let id = baseId;
  let counter = 1;

  while (usedIds.has(id)) {
    id = `${baseId}-${counter}`;
    counter++;
  }

  usedIds.add(id);
  return id;
};

export const MDXComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="text-4xl font-bold mb-4 mt-8" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => {
    const id = generateUniqueId(props.children?.toString() || '');
    return <h2 id={id} className="text-3xl font-semibold mb-3 mt-6 scroll-mt-20" {...props} />;
  },
  h3: (props: ComponentPropsWithoutRef<"h3">) => {
    const id = generateUniqueId(props.children?.toString() || '');
    return <h3 id={id} className="text-2xl font-semibold mb-2 mt-4 scroll-mt-20" {...props} />;
  },
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-4 leading-7" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => {
    const { href, ...rest } = props;
    if (href?.startsWith("/")) {
      return <Link href={href} className="text-[var(--accent)] hover:underline" {...rest} />;
    }
    return (
      <a
        href={href}
        className="text-[var(--accent)] hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      />
    );
  },
  img: (props: ComponentPropsWithoutRef<"img">) => {
    const ImageWithLightbox = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Image
            src={(props.src as string) || ""}
            alt={props.alt || ""}
            width={800}
            height={600}
            className="rounded-lg my-8 cursor-pointer hover:opacity-90 transition-opacity"
            style={{ maxWidth: "100%", height: "auto" }}
            onClick={() => setIsOpen(true)}
          />
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative max-w-7xl max-h-[90vh]">
                <Image
                  src={(props.src as string) || ""}
                  alt={props.alt || ""}
                  width={1920}
                  height={1080}
                  className="rounded-lg"
                  style={{ maxWidth: "100%", maxHeight: "90vh", height: "auto", width: "auto" }}
                />
                <button
                  className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </>
      );
    };

    return <ImageWithLightbox />;
  },
  code: ({ className, children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="bg-[var(--muted)] text-[var(--accent)] px-1.5 py-0.5 rounded text-sm font-mono font-semibold"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: (props: ComponentPropsWithoutRef<"pre">) => {
    const PreWithCopy = () => {
      const [copied, setCopied] = useState(false);

      // code 태그의 className에서 언어 추출
      const getLanguage = (): string | null => {
        const child = props.children as { props?: { className?: string } };
        const className = child?.props?.className || '';
        const match = className.match(/language-(\w+)/);
        return match ? match[1] : null;
      };

      const handleCopy = () => {
        // props.children이 code 태그를 포함하는 경우 처리
        const getTextContent = (node: unknown): string => {
          if (typeof node === 'string') return node;
          if (Array.isArray(node)) return node.map(getTextContent).join('');
          if (node && typeof node === 'object' && !Array.isArray(node)) {
            const obj = node as Record<string, unknown>;
            if ('props' in obj && obj.props && typeof obj.props === 'object') {
              const propsObj = obj.props as Record<string, unknown>;
              if ('children' in propsObj) {
                return getTextContent(propsObj.children);
              }
            }
          }
          return '';
        };

        const code = getTextContent(props.children);
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };

      const language = getLanguage();

      return (
        <div className="relative group my-6">
          {/* 언어 표시 */}
          {language && (
            <div className="absolute top-0 left-0 px-3 py-1 bg-[var(--accent)] text-white text-xs font-medium rounded-tl-lg rounded-br-lg z-10">
              {language.toUpperCase()}
            </div>
          )}

          <pre
            className="rounded-lg p-4 overflow-x-auto"
            style={{
              paddingTop: language ? '2.5rem' : '1rem',
              backgroundColor: 'var(--code-bg)'
            }}
            {...props}
          />

          {/* 복사 버튼 */}
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 px-3 py-1.5 text-xs font-medium bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] rounded shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] z-10"
            aria-label="Copy code"
          >
            {copied ? '✓ 복사됨' : '복사'}
          </button>
        </div>
      );
    };

    return <PreWithCopy />;
  },
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-7" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-4 border-[var(--accent)] pl-4 italic my-6 opacity-80"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border border-[var(--border)] bg-[var(--muted)] px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border border-[var(--border)] px-4 py-2" {...props} />
  ),
};
