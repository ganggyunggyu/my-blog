'use client';

import { TypingAnimation } from '@/shared/ui/typing-animation';

export const AboutSection = () => {
  return (
    <div className="max-w-2xl mx-auto mb-8 p-6 bg-[var(--muted)] rounded-lg border border-[var(--border)] min-h-[120px]">
      <div className="text-base leading-relaxed opacity-90">
        <TypingAnimation
          text={`안녕하세요! React와 TypeScript를 사랑하는 프론트엔드 개발자입니다.\n사용자 경험을 개선하고 깔끔한 코드를 작성하는 것을 지향합니다.\n이 블로그에서는 개발하며 배운 것들과 프로젝트 경험을 공유합니다.`}
          speed={30}
        />
      </div>
    </div>
  );
};
