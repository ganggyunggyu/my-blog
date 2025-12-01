'use client';

import { useState } from 'react';
import { HiX, HiPlus, HiCalendar } from 'react-icons/hi';

interface Metadata {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

interface Props {
  metadata: Metadata;
  onChange: (metadata: Metadata) => void;
}

export const MetadataForm = ({ metadata, onChange }: Props) => {
  const [tagInput, setTagInput] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

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
    <div className="vintage-border bg-[var(--card)] p-3 space-y-3 max-h-[30vh] overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Title */}
        <div className="space-y-1">
          <label className="text-xs font-semibold opacity-70">
            제목 *
          </label>
          <input
            type="text"
            value={metadata.title}
            onChange={(e) =>
              onChange({ ...metadata, title: e.target.value })
            }
            placeholder="포스트 제목을 입력하세요"
            className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
          />
        </div>

        {/* Date */}
        <div className="space-y-2 relative">
          <label className="text-sm font-semibold opacity-70">
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
            <HiCalendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-1">
        <label className="text-xs font-semibold opacity-70">
          태그
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
                <HiX className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-1.5">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="태그 입력 후 Enter"
            className="flex-1 px-3 py-1.5 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
          />
          <button
            onClick={handleAddTag}
            className="px-3 py-1.5 rounded-lg text-sm bg-[var(--accent)] text-white hover:opacity-90 transition-opacity flex items-center gap-1"
          >
            <HiPlus className="w-4 h-4" />
            추가
          </button>
        </div>
      </div>

      {/* Excerpt */}
      <div className="space-y-1">
        <label className="text-xs font-semibold opacity-70">
          요약 (SEO)
        </label>
        <textarea
          value={metadata.excerpt}
          onChange={(e) =>
            onChange({ ...metadata, excerpt: e.target.value })
          }
          placeholder="포스트 요약 (150-160자 권장)"
          rows={2}
          className="w-full px-3 py-1.5 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all resize-none"
        />
        <p className="text-xs opacity-50">
          {metadata.excerpt.length}/160 자
        </p>
      </div>
    </div>
  );
};
