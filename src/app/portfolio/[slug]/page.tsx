import { notFound } from 'next/navigation';
import { getPortfolioBySlug, getPortfolioSlugs } from '@/entities/portfolio';
import { format } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/shared/ui/mdx-components';
import Link from 'next/link';
import { ReadingProgress } from '@/shared/ui/reading-progress';
import { TableOfContents } from '@/features/table-of-contents';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import React from 'react';

export async function generateStaticParams() {
  const slugs = getPortfolioSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const portfolio = getPortfolioBySlug(slug);

  if (!portfolio) {
    return {
      title: '포트폴리오를 찾을 수 없습니다',
    };
  }

  return {
    title: `${portfolio.title} | 포트폴리오`,
    description: portfolio.description || portfolio.title,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const portfolio = getPortfolioBySlug(slug);

  if (!portfolio) {
    notFound();
  }

  return (
    <React.Fragment>
      <ReadingProgress />
      <TableOfContents />

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Link
            href="/portfolio"
            className="text-[var(--accent)] hover:underline mb-4 inline-block transition-all hover:translate-x-1"
          >
            ← 포트폴리오 목록으로
          </Link>
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">
            {portfolio.title}
          </h1>
          {portfolio.description && (
            <p className="text-lg opacity-80 mb-4">{portfolio.description}</p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm opacity-70 mb-4">
            {portfolio.period && <span>{portfolio.period}</span>}
            {portfolio.date && (
              <>
                {portfolio.period && <span>•</span>}
                <time
                  dateTime={new Date(portfolio.date).toISOString().split('T')[0]}
                >
                  {format(new Date(portfolio.date), 'yyyy.MM')}
                </time>
              </>
            )}
            {portfolio.role && (
              <>
                <span>•</span>
                <span>{portfolio.role}</span>
              </>
            )}
            {portfolio.readingTime && (
              <>
                <span>•</span>
                <span>📖 {portfolio.readingTime}분 소요</span>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {portfolio.github && (
              <a
                href={portfolio.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-2 bg-[var(--muted)] hover:bg-[var(--accent)] hover:text-white rounded-lg transition-all"
              >
                GitHub →
              </a>
            )}
            {portfolio.demo && (
              <a
                href={portfolio.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-2 bg-[var(--muted)] hover:bg-[var(--accent)] hover:text-white rounded-lg transition-all"
              >
                Demo →
              </a>
            )}
          </div>
          {portfolio.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {portfolio.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-[var(--muted)] px-2 py-1 rounded hover:bg-[var(--accent)] hover:text-white transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-lg">
          <MDXRemote
            source={portfolio.content}
            components={MDXComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, [rehypePrism, { ignoreMissing: true }]],
              },
            }}
          />
        </div>
      </article>
    </React.Fragment>
  );
}
