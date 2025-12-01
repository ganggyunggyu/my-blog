'use client';

import { MdxEditor } from '@/features/mdx-editor';

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <MdxEditor />
    </div>
  );
}
