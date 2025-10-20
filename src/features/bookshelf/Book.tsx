'use client';

import Link from "next/link";
import { PostMeta } from "@/entities/post";
import { useState } from "react";

interface Props {
  post: PostMeta;
  index: number;
}

const colorsByTag: Record<string, string> = {
  'React': '#61dafb',
  'Next.js': '#000000',
  'TypeScript': '#3178c6',
  'JavaScript': '#f7df1e',
  'CSS': '#1572b6',
  'Node.js': '#339933',
  'Vue': '#42b883',
  'Python': '#3776ab',
  'Portfolio': '#a0826d',
  'Project': '#8b6f5c',
  'default': '#d4a574',
};

const getBookColor = (tags: string[]): string => {
  if (tags.length === 0) return colorsByTag.default;
  const firstTag = tags[0];
  return colorsByTag[firstTag] || colorsByTag.default;
};

const getBookHeight = (contentLength?: number): number => {
  // 콘텐츠 길이에 따라 책 높이 결정 (180-300px)
  if (!contentLength) return 200; // 기본값

  const baseHeight = 180;
  const maxHeight = 300;

  // 1000자 기준으로 스케일링 (1000자 = 기본, 5000자+ = 최대)
  const scaledHeight = baseHeight + (contentLength / 5000) * (maxHeight - baseHeight);

  return Math.min(Math.max(scaledHeight, baseHeight), maxHeight);
};

export function Book({ post, index }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const bookColor = getBookColor(post.tags);
  const bookHeight = getBookHeight(post.contentLength);
  const isDark = ['#000000', '#3178c6'].includes(bookColor);

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="relative group z-10 hover:z-50"
      style={{
        animation: `fade-in-up 0.5s ease-out ${index * 0.1}s both`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative transition-all duration-300 cursor-pointer ${
          isHovered ? '-translate-y-4' : ''
        }`}
        style={{
          width: '80px',
          height: `${bookHeight}px`,
          backgroundColor: bookColor,
          border: '2px solid rgba(0,0,0,0.2)',
          boxShadow: isHovered
            ? '0 10px 30px rgba(0,0,0,0.3)'
            : '2px 2px 5px rgba(0,0,0,0.2)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 책 등 */}
        <div className="absolute inset-0 flex items-center justify-center p-2">
          <p
            className={`text-xs font-bold text-center break-words leading-tight ${
              isDark ? 'text-white' : 'text-[var(--foreground)]'
            }`}
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              letterSpacing: '2px',
            }}
          >
            {post.title}
          </p>
        </div>

        {/* 책 옆면 (3D 효과) */}
        <div
          className="absolute top-0 right-0 h-full w-2"
          style={{
            backgroundColor: `color-mix(in srgb, ${bookColor} 70%, black)`,
            transform: 'rotateY(90deg) translateZ(1px)',
            transformOrigin: 'right',
          }}
        />

        {/* 호버 시 툴팁 */}
        {isHovered && (
          <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-[var(--background)] border border-[var(--border)] p-4 rounded-lg shadow-xl w-64 pointer-events-none">
            <h3 className="font-bold mb-2 text-sm">{post.title}</h3>
            {post.readingTime && (
              <p className="text-xs opacity-60 mb-2">📖 {post.readingTime}분 소요</p>
            )}
            {post.excerpt && (
              <p className="text-xs opacity-80 mb-2">{post.excerpt}</p>
            )}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-[var(--muted)] px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
