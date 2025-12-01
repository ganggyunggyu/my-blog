'use client';

import { HiX, HiPlus } from 'react-icons/hi';

interface TagInputProps {
  label: string;
  placeholder: string;
  tags: string[];
  tagInput: string;
  onTagInputChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const TagInput = ({
  label,
  placeholder,
  tags,
  tagInput,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
  onKeyPress,
}: TagInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold opacity-70">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--accent)]/20 text-sm font-medium"
          >
            {tag}
            <button
              onClick={() => onRemoveTag(tag)}
              className="hover:bg-[var(--accent)]/30 rounded-full p-0.5 transition-colors"
            >
              <HiX className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-1.5">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => onTagInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          className="flex-1 px-3 py-1.5 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
        />
        <button
          onClick={onAddTag}
          className="px-3 py-1.5 rounded-lg text-sm bg-[var(--accent)] text-white hover:opacity-90 transition-opacity flex items-center gap-1"
        >
          <HiPlus className="w-4 h-4" />
          추가
        </button>
      </div>
    </div>
  );
};
