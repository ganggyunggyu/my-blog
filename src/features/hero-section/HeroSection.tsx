'use client';

import Link from "next/link";
import { TypingAnimation } from "@/shared/ui/typing-animation";

export function HeroSection() {
  return (
    <section className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4 animate-fade-in">
        안녕하세요, 감겸규입니다
      </h1>
      <div className="text-xl opacity-80 mb-8 min-h-[2rem]">
        <TypingAnimation text="프론트엔드 개발자로 성장하며 배운 것들을 기록합니다" speed={60} />
      </div>
      <Link
        href="/posts"
        className="inline-block bg-[var(--accent)] text-white px-6 py-3 rounded-lg hover:opacity-90 hover:scale-105 transition-all duration-300"
      >
        포스트 둘러보기
      </Link>
    </section>
  );
}
