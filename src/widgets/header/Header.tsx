import Link from "next/link";
import { ThemeToggle } from "@/shared/ui/theme-toggle";

export function Header() {
  return (
    <header className="border-b border-[var(--border)] sticky top-0 bg-[var(--background)] z-10">
      <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:text-[var(--accent)] transition-colors">
          감겸규.dev
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">
            홈
          </Link>
          <Link href="/posts" className="hover:text-[var(--accent)] transition-colors">
            포스트
          </Link>
          <Link href="/editor" className="hover:text-[var(--accent)] transition-colors">
            에디터
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
