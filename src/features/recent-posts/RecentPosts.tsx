'use client';

import Link from "next/link";
import { format } from "date-fns";
import { useState } from "react";
import { PostMeta } from "@/entities/post";

interface Props {
  posts: PostMeta[];
}

export function RecentPosts({ posts }: Props) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  if (posts.length === 0) return null;

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">최근 포스트</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(({ slug, title, date, excerpt, tags }, index) => (
          <Link
            key={slug}
            href={`/posts/${slug}`}
            className="block p-6 border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            style={{
              animation: `fade-in-up 0.5s ease-out ${index * 0.1}s both`
            }}
            onMouseEnter={() => setHoveredCard(slug)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 className={`text-xl font-semibold mb-2 transition-colors ${hoveredCard === slug ? 'text-[var(--accent)]' : ''}`}>
              {title}
            </h3>
            <p className="text-sm opacity-70 mb-3">
              {format(new Date(date), "yyyy년 MM월 dd일")}
            </p>
            {excerpt && <p className="opacity-80 mb-3">{excerpt}</p>}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-[var(--muted)] px-2 py-1 rounded transition-all duration-200 hover:bg-[var(--accent)] hover:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
