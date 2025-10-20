import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/entities/post";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/shared/ui/mdx-components";
import Link from "next/link";
import { ReadingProgress } from "@/shared/ui/reading-progress";
import { TableOfContents } from "@/features/table-of-contents";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다",
    };
  }

  return {
    title: `${post.title} | 개발 블로그`,
    description: post.excerpt || post.title,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <TableOfContents />

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Link
            href="/posts"
            className="text-[var(--accent)] hover:underline mb-4 inline-block transition-all hover:translate-x-1"
          >
            ← 포스트 목록으로
          </Link>
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm opacity-70 mb-4">
            <time dateTime={new Date(post.date).toISOString().split('T')[0]}>
              {format(new Date(post.date), "yyyy년 MM월 dd일")}
            </time>
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
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
            source={post.content}
            components={MDXComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [rehypePrism, { ignoreMissing: true }]
                ],
              },
            }}
          />
        </div>
      </article>
    </>
  );
}
