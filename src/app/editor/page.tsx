"use client";

import { useState, useEffect } from "react";
import { MarkdownEditor } from "@/features/markdown-editor";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { MDXComponents } from "@/shared/ui/mdx-components";

const DEFAULT_CONTENT = `---
title: 새 포스트
date: ${new Date().toISOString().split("T")[0]}
tags: [예제, 블로그]
excerpt: 이것은 예제 포스트입니다.
---

# 제목

여기에 내용을 작성하세요.

## 코드 예제

\`\`\`javascript
const hello = () => {
  console.log("Hello, World!");
};
\`\`\`

## 리스트

- 항목 1
- 항목 2
- 항목 3

**굵은 글씨**와 *기울임* 텍스트도 사용할 수 있습니다.
`;

export default function EditorPage() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [fileName, setFileName] = useState("new-post");

  useEffect(() => {
    const compileMDX = async () => {
      try {
        const compiled = await serialize(content);
        setMdxSource(compiled);
      } catch (error) {
        console.error("MDX compilation error:", error);
      }
    };
    compileMDX();
  }, [content]);

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.mdx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Markdown 에디터</h1>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)]"
            placeholder="파일명 (확장자 제외)"
          />
          <button
            onClick={handleDownload}
            className="bg-[var(--accent)] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            .mdx로 다운로드
          </button>
        </div>
        <p className="text-sm opacity-70 mt-2">
          다운로드한 파일을 <code className="bg-[var(--muted)] px-2 py-1 rounded">content/posts/</code> 폴더에 넣으세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">편집</h2>
          <div className="border border-[var(--border)] rounded-lg overflow-hidden">
            <MarkdownEditor value={content} onChange={setContent} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">미리보기</h2>
          <div className="border border-[var(--border)] rounded-lg p-6 min-h-[600px] overflow-auto prose prose-lg">
            {mdxSource && (
              <MDXRemote {...mdxSource} components={MDXComponents} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
