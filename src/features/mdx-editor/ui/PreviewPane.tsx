'use client';

import { useMemo, ReactElement } from 'react';
import matter from 'gray-matter';

interface Props {
  mdx: string;
}

export const PreviewPane = ({ mdx }: Props) => {
  const { metadata, content } = useMemo(() => {
    try {
      const { data, content } = matter(mdx);
      return {
        metadata: data,
        content,
      };
    } catch {
      return {
        metadata: {},
        content: mdx,
      };
    }
  }, [mdx]);

  // 간단한 마크다운 렌더링 (제목, 리스트, 코드 블록)
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: ReactElement[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLang = '';

    lines.forEach((line, index) => {
      // 코드 블록 시작/종료
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockLang = line.slice(3).trim();
          codeBlockContent = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <pre key={index} className="bg-gray-800 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
              <code className={`language-${codeBlockLang}`}>
                {codeBlockContent.join('\n')}
              </code>
            </pre>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // 제목
      if (line.startsWith('# ')) {
        elements.push(<h1 key={index} className="text-4xl font-bold my-4">{line.slice(2)}</h1>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-3xl font-bold my-3">{line.slice(3)}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={index} className="text-2xl font-bold my-2">{line.slice(4)}</h3>);
      } else if (line.startsWith('#### ')) {
        elements.push(<h4 key={index} className="text-xl font-bold my-2">{line.slice(5)}</h4>);
      }
      // 리스트
      else if (line.startsWith('- ')) {
        elements.push(<li key={index} className="ml-4">{line.slice(2)}</li>);
      }
      // 일반 텍스트
      else if (line.trim()) {
        elements.push(<p key={index} className="my-2">{line}</p>);
      }
      // 빈 줄
      else {
        elements.push(<br key={index} />);
      }
    });

    return elements;
  };

  return (
    <div className="w-screen md:w-1/2 flex flex-col overflow-hidden border-l border-[var(--border)]">
      <div className="vintage-border bg-[var(--card)] px-4 py-2 text-sm font-semibold opacity-70">
        미리보기
      </div>
      <div className="flex-1 p-6 bg-[var(--background)] overflow-y-auto">
        {content.trim() ? (
          <article className="prose prose-lg max-w-none dark:prose-invert">
            {metadata && Object.keys(metadata).length > 0 && (
              <div className="mb-6 p-4 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30">
                <p className="text-sm font-semibold opacity-70 mb-2">메타데이터:</p>
                <pre className="text-xs opacity-60">{JSON.stringify(metadata, null, 2)}</pre>
              </div>
            )}
            {renderMarkdown(content)}
          </article>
        ) : (
          <p className="text-center opacity-50 mt-8">
            마크다운을 입력하면 여기에 미리보기가 표시됩니다
          </p>
        )}
      </div>
    </div>
  );
};
