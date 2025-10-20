# 개발 블로그

> 강경규 기술 블로그

- https://vercel.com/ganggyunggyus-projects

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Content**: MDX
- **Architecture**: FSD (Feature-Sliced Design)

## 📂 프로젝트 구조

```
src/
├── app/              # Next.js App Router (라우팅, 레이아웃)
├── widgets/          # 독립적 UI 블록 (Header)
├── features/         # 비즈니스 기능 (markdown-editor)
├── entities/         # 도메인 엔티티 (post)
├── shared/           # 공용 유틸리티, UI
└── content/          # MDX 포스트 파일
```

## 🛠️ 개발 환경 설정

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

## ✍️ 포스트 작성

1. `src/content/posts/` 디렉토리에 `.mdx` 파일 생성
2. Front Matter 작성:

```mdx
---
title: 포스트 제목
date: 2025-01-20
tags: [React, Next.js]
excerpt: 포스트 요약
---
```
