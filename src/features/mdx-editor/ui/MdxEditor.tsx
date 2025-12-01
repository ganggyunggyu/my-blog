'use client';

import { useState } from 'react';
import { MetadataForm } from './MetadataForm';
import { PortfolioMetadataForm } from './PortfolioMetadataForm';
import { CodeEditor } from './CodeEditor';
import { PreviewPane } from './PreviewPane';
import { HiDownload, HiEye, HiCode, HiDocumentText, HiBriefcase } from 'react-icons/hi';
import { ContentType, PostMetadata, PortfolioMetadata } from '@/features/mdx-editor/types';

export const MdxEditor = () => {
  const [contentType, setContentType] = useState<ContentType>('post');
  const [postMetadata, setPostMetadata] = useState<PostMetadata>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    tags: [],
    excerpt: '',
  });
  const [portfolioMetadata, setPortfolioMetadata] = useState<PortfolioMetadata>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    tags: [],
    period: '',
    role: '',
    github: '',
    demo: '',
    featured: false,
  });
  const [content, setContent] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  const generateMdx = () => {
    let frontmatter = '';

    if (contentType === 'post') {
      frontmatter = `---
title: ${postMetadata.title}
date: ${postMetadata.date}
tags: [${postMetadata.tags.join(', ')}]
excerpt: ${postMetadata.excerpt}
---

`;
    } else {
      frontmatter = `---
title: ${portfolioMetadata.title}
description: ${portfolioMetadata.description}
date: ${portfolioMetadata.date}
tags: [${portfolioMetadata.tags.join(', ')}]
${portfolioMetadata.period ? `period: ${portfolioMetadata.period}` : ''}
${portfolioMetadata.role ? `role: ${portfolioMetadata.role}` : ''}
${portfolioMetadata.github ? `github: ${portfolioMetadata.github}` : ''}
${portfolioMetadata.demo ? `demo: ${portfolioMetadata.demo}` : ''}
featured: ${portfolioMetadata.featured}
---

`;
    }

    return frontmatter + content;
  };

  const handleDownload = () => {
    const mdx = generateMdx();
    const blob = new Blob([mdx], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const title = contentType === 'post' ? postMetadata.title : portfolioMetadata.title;
    a.download = `${title || 'untitled'}.mdx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="vintage-border bg-[var(--background)] px-4 py-2 flex items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">MDX Editor</h1>
          <div className="flex gap-1.5">
            <button
              onClick={() => setContentType('post')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                contentType === 'post'
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20'
              }`}
            >
              <HiDocumentText className="w-4 h-4" />
              <span className="hidden sm:inline">포스트</span>
            </button>
            <button
              onClick={() => setContentType('portfolio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                contentType === 'portfolio'
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20'
              }`}
            >
              <HiBriefcase className="w-4 h-4" />
              <span className="hidden sm:inline">포트폴리오</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 transition-colors"
          >
            {showPreview ? (
              <>
                <HiCode className="w-4 h-4" />
                <span className="hidden sm:inline">코드</span>
              </>
            ) : (
              <>
                <HiEye className="w-4 h-4" />
                <span className="hidden sm:inline">미리보기</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
          >
            <HiDownload className="w-4 h-4" />
            <span className="hidden sm:inline">다운로드</span>
          </button>
        </div>
      </div>

      {/* Metadata Form */}
      {contentType === 'post' ? (
        <MetadataForm metadata={postMetadata} onChange={setPostMetadata} />
      ) : (
        <PortfolioMetadataForm
          metadata={portfolioMetadata}
          onChange={setPortfolioMetadata}
        />
      )}

      {/* Editor & Preview */}
      <div className="flex-1 flex overflow-hidden">
        <CodeEditor
          value={content}
          onChange={setContent}
          className={showPreview ? 'w-screen md:w-1/2' : 'w-full'}
        />
        {showPreview && <PreviewPane mdx={generateMdx()} />}
      </div>
    </div>
  );
};
