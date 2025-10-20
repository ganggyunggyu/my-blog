import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/shared/ui/theme-provider";
import { Header } from "@/widgets/header";

export const metadata: Metadata = {
  title: "감겸규 개발 블로그",
  description: "프론트엔드 개발자 감겸규의 기술 블로그입니다. Next.js, React, TypeScript를 활용한 개발 경험을 공유합니다.",
  authors: [{ name: "감겸규" }],
  keywords: ["감겸규", "프론트엔드", "React", "Next.js", "TypeScript", "개발 블로그"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <Header />
          <main className="max-w-5xl mx-auto px-4 py-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
