import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/shared/ui/theme-provider";
import { Header } from "@/widgets/header";

export const metadata: Metadata = {
  title: "개발 블로그",
  description: "Next.js와 MDX로 만든 개발 블로그",
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
