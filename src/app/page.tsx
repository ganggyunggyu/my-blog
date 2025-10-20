import Link from "next/link";
import { getAllPosts } from "@/entities/post";
import { format } from "date-fns";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">안녕하세요, 감겸규입니다</h1>
        <p className="text-xl opacity-80 mb-8">
          프론트엔드 개발자로 성장하며 배운 것들을 기록합니다
        </p>
        <Link
          href="/posts"
          className="inline-block bg-[var(--accent)] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          포스트 둘러보기
        </Link>
      </section>

      {posts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">최근 포스트</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(({ slug, title, date, excerpt, tags }) => (
              <Link
                key={slug}
                href={`/posts/${slug}`}
                className="block p-6 border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm opacity-70 mb-3">
                  {format(new Date(date), "yyyy년 MM월 dd일")}
                </p>
                {excerpt && <p className="opacity-80 mb-3">{excerpt}</p>}
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
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
