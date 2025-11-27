'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { PortfolioMeta } from '@/entities/portfolio';

interface Props {
  portfolios: PortfolioMeta[];
}

export const PortfolioList = ({ portfolios }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    portfolios.forEach(({ tags }) => tags.forEach((tag) => tagsSet.add(tag)));
    return Array.from(tagsSet).sort();
  }, [portfolios]);

  const filteredPortfolios = useMemo(() => {
    return portfolios.filter(({ title, description, tags }) => {
      const matchesSearch =
        searchQuery === '' ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag === null || tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [portfolios, searchQuery, selectedTag]);

  if (portfolios.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl opacity-70">아직 등록된 포트폴리오가 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="포트폴리오 검색..."
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

      {filteredPortfolios.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl opacity-70">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPortfolios.map(
            ({
              slug,
              title,
              description,
              date,
              tags,
              thumbnail,
              github,
              demo,
              featured,
              period,
            }) => (
              <article
                key={slug}
                className="border border-[var(--border)] rounded-lg overflow-hidden hover:border-[var(--accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {thumbnail && (
                  <div className="relative h-48 bg-[var(--muted)]">
                    <img
                      src={thumbnail}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                    {featured && (
                      <span className="absolute top-3 right-3 bg-[var(--accent)] text-white text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <Link href={`/portfolio/${slug}`}>
                    <h2 className="text-2xl font-bold mb-2 hover:text-[var(--accent)] transition-colors">
                      {title}
                    </h2>
                  </Link>
                  <div className="flex gap-3 text-sm opacity-70 mb-3">
                    {period && <span>{period}</span>}
                    {date && <span>{format(new Date(date), 'yyyy.MM')}</span>}
                  </div>
                  {description && <p className="opacity-80 mb-4">{description}</p>}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
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
                  <div className="flex gap-3 text-sm">
                    {github && (
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] hover:underline"
                      >
                        GitHub →
                      </a>
                    )}
                    {demo && (
                      <a
                        href={demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] hover:underline"
                      >
                        Demo →
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      )}
    </>
  );
};
