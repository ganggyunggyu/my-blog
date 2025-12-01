'use client';

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const CodeEditor = ({ value, onChange, className = '' }: Props) => {
  return (
    <div className={`${className} flex flex-col`}>
      <div className="vintage-border bg-[var(--card)] px-4 py-2 text-sm font-semibold opacity-70">
        마크다운 에디터
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="마크다운 내용을 입력하세요...

# 제목

## 부제목

일반 텍스트입니다.

```javascript
const hello = 'world';
```

- 리스트 아이템 1
- 리스트 아이템 2"
        className="flex-1 p-4 bg-[var(--background)] font-mono text-sm resize-none focus:outline-none"
        spellCheck={false}
      />
    </div>
  );
};
