'use client';

import { FaBlog } from 'react-icons/fa';
import { useScrollAnimation } from '@/shared/hooks';

interface BlogItem {
  name: string;
  url: string;
  description: string;
  color: string;
}

const blogs: BlogItem[] = [
  {
    name: 'Naver Blog',
    url: 'https://blog.naver.com/ddo_ddi_appa',
    description: '행궁 언덕살이',
    color: '#03C75A',
  },
  {
    name: 'Naver Blog',
    url: 'https://blog.naver.com/gnggnggyu_',
    description: '규덩이',
    color: '#03C75A',
  },
  {
    name: 'Naver Blog',
    url: 'https://blog.naver.com/mm__mm984',
    description: '감뽕이',
    color: '#03C75A',
  },
];

export const BlogSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5 });

  return (
    <section
      ref={ref}
      className={`my-16 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* 제목 */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Blog</h2>
          <p className="text-base opacity-70">
            다른 블로그도 함께 운영하고 있어요
          </p>
        </div>

        {/* 블로그 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <a
              key={blog.url}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              style={{
                animation: `fade-in-up 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* 블로그 카드 */}
              <div className="relative overflow-hidden rounded-lg border-2 border-[var(--border)] bg-[var(--background)] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1">
                {/* 상단 색상 바 */}
                <div
                  className="h-2 w-full"
                  style={{ backgroundColor: blog.color }}
                />

                {/* 카드 내용 */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="text-3xl transition-all duration-300 group-hover:scale-110"
                      style={{ color: blog.color }}
                    >
                      <FaBlog />
                    </div>
                    <h3 className="font-bold text-xl">{blog.name}</h3>
                  </div>
                  <p className="text-sm opacity-70 mb-4">{blog.description}</p>
                  <div className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    블로그 방문하기 →
                  </div>
                </div>

                {/* 호버 시 배경 효과 */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                  style={{ backgroundColor: blog.color }}
                />
              </div>
            </a>
          ))}
        </div>

        {/* 구분선 */}
        <div className="mt-12 border-t border-[var(--border)] opacity-30" />
      </div>
    </section>
  );
};
