import Link from "next/link";
import { getAllPosts } from "@/entities/post";
import { format } from "date-fns";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">모든 포스트</h1>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl opacity-70 mb-4">아직 작성된 포스트가 없습니다.</p>
          <Link
            href="/editor"
            className="inline-block bg-[var(--accent)] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            첫 포스트 작성하기
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(({ slug, title, date, excerpt, tags }) => (
            <article
              key={slug}
              className="border border-[var(--border)] rounded-lg p-6 hover:border-[var(--accent)] transition-colors"
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
                    <span
                      key={tag}
                      className="text-xs bg-[var(--muted)] px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
