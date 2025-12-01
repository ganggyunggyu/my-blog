'use client';

import { useState } from 'react';
import { HiX, HiPlus, HiCalendar } from 'react-icons/hi';

interface PortfolioMetadata {
  title: string;
  description: string;
  date: string;
  tags: string[];
  period?: string;
  role?: string;
  github?: string;
  demo?: string;
  featured: boolean;
}

interface Props {
  metadata: PortfolioMetadata;
  onChange: (metadata: PortfolioMetadata) => void;
}

export const PortfolioMetadataForm = ({ metadata, onChange }: Props) => {
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() && !metadata.tags.includes(tagInput.trim())) {
      onChange({
        ...metadata,
        tags: [...metadata.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange({
      ...metadata,
      tags: metadata.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="vintage-border bg-[var(--card)] p-3 space-y-2 max-h-[30vh] overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Title */}
        <div className="space-y-1">
          <label className="text-xs font-semibold opacity-70">
            프로젝트명 *
          </label>
          <input
            type="text"
            value={metadata.title}
            onChange={(e) =>
              onChange({ ...metadata, title: e.target.value })
            }
            placeholder="프로젝트 이름을 입력하세요"
            className="w-full px-3 py-1.5 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-xs font-semibold opacity-70">
            작성일 *
          </label>
          <div className="relative">
            <input
              type="date"
              value={metadata.date}
              onChange={(e) =>
                onChange({ ...metadata, date: e.target.value })
              }
              className="w-full px-3 py-1.5 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
            />
            <HiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Period */}
        <div className="space-y-2">
          <label className="text-xs font-semibold opacity-70">
            프로젝트 기간
          </label>
          <input
            type="text"
            value={metadata.period || ''}
            onChange={(e) =>
              onChange({ ...metadata, period: e.target.value })
            }
            placeholder="예: 2024.01 - 2024.03"
            className="w-full px-3 py-1.5 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
          />
        </div>

        {/* Role */}
        <div className="space-y-2">
          <label className="text-xs font-semibold opacity-70">
            역할
          </label>
          <input
            type="text"
            value={metadata.role || ''}
            onChange={(e) =>
              onChange({ ...metadata, role: e.target.value })
            }
            placeholder="예: 프론트엔드 개발"
            className="w-full px-3 py-1.5 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* GitHub */}
        <div className="space-y-2">
          <label className="text-xs font-semibold opacity-70">
            GitHub URL
          </label>
          <input
            type="url"
            value={metadata.github || ''}
            onChange={(e) =>
              onChange({ ...metadata, github: e.target.value })
            }
            placeholder="https://github.com/..."
            className="w-full px-3 py-1.5 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
          />
        </div>

        {/* Demo */}
        <div className="space-y-2">
          <label className="text-xs font-semibold opacity-70">
            데모 URL
          </label>
          <input
            type="url"
            value={metadata.demo || ''}
            onChange={(e) =>
              onChange({ ...metadata, demo: e.target.value })
            }
            placeholder="https://demo.example.com"
            className="w-full px-3 py-1.5 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="text-xs font-semibold opacity-70">
          기술 스택
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {metadata.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--accent)]/20 text-sm font-medium"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:bg-[var(--accent)]/30 rounded-full p-0.5 transition-colors"
              >
                <HiX className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="기술 스택을 입력하고 Enter를 누르세요"
            className="flex-1 px-3 py-1.5 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
          />
          <button
            onClick={handleAddTag}
            className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <HiPlus className="w-5 h-5" />
            추가
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-xs font-semibold opacity-70">
          프로젝트 설명 (SEO 최적화)
        </label>
        <textarea
          value={metadata.description}
          onChange={(e) =>
            onChange({ ...metadata, description: e.target.value })
          }
          placeholder="프로젝트 설명을 입력하세요 (150-160자 권장)"
          rows={2}
          className="w-full px-3 py-1.5 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all resize-none"
        />
        <p className="text-xs opacity-50">
          {metadata.description.length}/160 자
        </p>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          checked={metadata.featured}
          onChange={(e) =>
            onChange({ ...metadata, featured: e.target.checked })
          }
          className="w-5 h-5 rounded accent-[var(--accent)] cursor-pointer"
        />
        <label
          htmlFor="featured"
          className="text-xs font-semibold opacity-70 cursor-pointer"
        >
          주요 프로젝트로 표시
        </label>
      </div>
    </div>
  );
};
