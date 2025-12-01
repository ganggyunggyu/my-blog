'use client';

import { HiCalendar } from 'react-icons/hi';
import { PostMetadata } from '@/features/mdx-editor/types';
import { useTagManager } from '@/features/mdx-editor/hooks/useTagManager';
import { TagInput } from './shared/TagInput';

interface Props {
  metadata: PostMetadata;
  onChange: (metadata: PostMetadata) => void;
}

export const MetadataForm = ({ metadata, onChange }: Props) => {
  const { tagInput, setTagInput, handleAddTag, handleRemoveTag, handleKeyPress } =
    useTagManager({
      tags: metadata.tags,
      onTagsChange: (tags) => onChange({ ...metadata, tags }),
    });

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
      <TagInput
        label="태그"
        placeholder="태그 입력 후 Enter"
        tags={metadata.tags}
        tagInput={tagInput}
        onTagInputChange={setTagInput}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onKeyPress={handleKeyPress}
      />

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
