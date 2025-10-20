'use client';

import Link from 'next/link';
import { AboutSection } from './AboutSection';
import { HiDocumentText, HiPencilSquare } from 'react-icons/hi2';

export function HeroSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* 빈티지 종이 질감 배경 */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            var(--muted) 2px,
            var(--muted) 4px
          )`,
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* 빈티지 장식 상단 */}
        <div className="text-4xl mb-6 opacity-50">✦</div>

        <h1
          className="text-6xl font-bold mb-6 animate-fade-in"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          gnggnggyu_log
        </h1>

        <p className="text-2xl opacity-80 mb-8 italic animate-fade-in">
          프론트엔드 개발자로 성장하며 배운 것들을 기록합니다
        </p>

        {/* 자기소개 */}
        <AboutSection />

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/posts"
            className="vintage-button text-base px-8 py-3 flex items-center gap-2"
          >
            <HiDocumentText className="text-lg" />
            포스트 보기
          </Link>
          <Link
            href="/editor"
            className="vintage-button text-base px-8 py-3 flex items-center gap-2"
          >
            <HiPencilSquare className="text-lg" />글 작성하기
          </Link>
        </div>

        {/* 빈티지 장식 하단 */}
        <div className="text-4xl mt-8 opacity-50">✦</div>
      </div>
    </section>
  );
}
