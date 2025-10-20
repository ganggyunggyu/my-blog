'use client';

import Link from "next/link";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { PostMeta } from "@/entities/post";

interface Props {
  posts: PostMeta[];
}

export function PostList({ posts }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl opacity-70 mb-4">아직 작성된 포스트가 없습니다.</p>
        <Link
          href="/editor"
          className="inline-block bg-[var(--accent)] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          첫 포스트 작성하기
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="포스트 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--background)] focus:border-[var(--accent)] focus:outline-none transition-colors"
        />

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`text-sm px-3 py-1.5 rounded-lg transition-all ${
                selectedTag === null
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--muted)] hover:bg-[var(--accent)] hover:text-white'
              }`}
            >
              전체
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`text-sm px-3 py-1.5 rounded-lg transition-all ${
                  selectedTag === tag
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--muted)] hover:bg-[var(--accent)] hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl opacity-70">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map(({ slug, title, date, excerpt, tags }) => (
            <article
              key={slug}
              className="border border-[var(--border)] rounded-lg p-6 hover:border-[var(--accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Link href={`/posts/${slug}`}>
                <h2 className="text-2xl font-bold mb-2 hover:text-[var(--accent)] transition-colors">
                  {title}
                </h2>
              </Link>
              <p className="text-sm opacity-70 mb-3">
                {format(new Date(date), "yyyy년 MM월 dd일")}
              </p>
              {excerpt && <p className="opacity-80 mb-4">{excerpt}</p>}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedTag(tag);
                      }}
                      className="text-xs bg-[var(--muted)] px-2 py-1 rounded hover:bg-[var(--accent)] hover:text-white transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </>
  );
}
