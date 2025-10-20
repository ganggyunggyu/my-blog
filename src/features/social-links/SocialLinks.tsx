'use client';

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { HiLink } from 'react-icons/hi2';

interface LinkItem {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

const links: LinkItem[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/ganggyunggyu',
    icon: <FaGithub />,
    color: '#333333',
  },
  {
    name: 'LinkedIn',
    url: 'www.linkedin.com/in/gyunggyugang',
    icon: <FaLinkedin />,
    color: '#0A66C2',
  },
  {
    name: 'Email',
    url: 'ganggyunggyi@gmail.com',
    icon: <FaEnvelope />,
    color: '#EA4335',
  },
  {
    name: 'Portfolio',
    url: 'https://yourportfolio.com',
    icon: <HiLink />,
    color: '#a0826d',
  },
];

export function SocialLinks() {
  return (
    <section className="my-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* 제목 */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Connect</h2>
          <p className="text-base opacity-70">다양한 채널에서 만나보세요</p>
        </div>

        {/* 북마크 스타일 링크들 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {links.map((link, index) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              style={{
                animation: `fade-in-up 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* 북마크 카드 */}
              <div className="relative overflow-hidden rounded-lg border-2 border-[var(--border)] bg-[var(--background)] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1">
                {/* 북마크 리본 효과 */}
                <div
                  className="absolute top-0 right-0 w-0 h-0 border-solid transition-all duration-300"
                  style={{
                    borderTopWidth: '30px',
                    borderRightWidth: '30px',
                    borderBottomWidth: '0',
                    borderLeftWidth: '0',
                    borderTopColor: link.color,
                    borderRightColor: 'transparent',
                    opacity: 0.3,
                  }}
                />

                {/* 카드 내용 */}
                <div className="p-6 flex flex-col items-center justify-center min-h-[140px]">
                  <div
                    className="text-4xl mb-3 transition-all duration-300 group-hover:scale-110"
                    style={{ color: link.color }}
                  >
                    {link.icon}
                  </div>
                  <h3 className="font-bold text-lg">{link.name}</h3>
                  <div className="mt-2 text-xs opacity-0 group-hover:opacity-70 transition-opacity">
                    방문하기 →
                  </div>
                </div>

                {/* 호버 시 배경 효과 */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                  style={{ backgroundColor: link.color }}
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
}
