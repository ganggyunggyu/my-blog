'use client';

import { PostMeta } from "@/entities/post";
import { Book } from "./Book";
import { HiLightBulb } from "react-icons/hi2";

interface Props {
  posts: PostMeta[];
}

export function Bookshelf({ posts }: Props) {
  if (posts.length === 0) return null;

  // 최대 10개만 표시
  const displayPosts = posts.slice(0, 10);
  const hasMore = posts.length > 10;

  return (
    <section className="my-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">최근 포스트</h2>
        <p className="text-lg opacity-80">
          클릭하여 글을 읽어보세요
        </p>
      </div>

      {/* 책장 배경 */}
      <div className="relative">
        {/* 선반들 */}
        <div className="space-y-8">
          {/* 선반 1 */}
          <div className="relative">
            {/* 선반 판 */}
            <div
              className="absolute bottom-0 left-0 right-0 h-4 rounded"
              style={{
                background: 'linear-gradient(180deg, #8b7355 0%, #6b5845 100%)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
              }}
            />

            {/* 책들 */}
            <div className="flex items-end justify-center gap-2 pb-4 px-4 flex-wrap">
              {displayPosts.map((post, index) => (
                <Book key={post.slug} post={post} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* 책장 측면 그림자 효과 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at top, transparent 60%, rgba(0,0,0,0.1) 100%),
              radial-gradient(ellipse at bottom, transparent 60%, rgba(0,0,0,0.15) 100%)
            `,
          }}
        />
      </div>

      {/* 안내 텍스트 */}
      <div className="text-center mt-8 opacity-70 text-sm">
        <p className="flex items-center justify-center gap-2">
          <HiLightBulb className="text-base" />
          카드 위에 마우스를 올려보세요
        </p>
        {hasMore && (
          <p className="mt-2">
            <a href="/posts" className="text-[var(--accent)] hover:underline">
              전체 {posts.length}개의 포스트 보기 →
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
