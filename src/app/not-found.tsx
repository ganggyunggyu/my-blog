import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">페이지를 찾을 수 없습니다</h2>
      <p className="text-lg opacity-70 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link
        href="/"
        className="bg-[var(--accent)] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
