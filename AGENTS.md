# Project Guide

## Overview
- Next.js 15 (App Router) with React 19 and TypeScript.
- Tailwind CSS v4 for styling, MDX for content.
- Feature-Sliced Design (FSD) layout under `src/`.

## Structure
- `src/app`: routes, layout, and global styles.
- `src/app/provider`: app-wide providers (Theme, React Query, Jotai).
- `src/widgets`: page-level UI blocks (e.g., header).
- `src/features`: feature modules (e.g., markdown editor, lists).
- `src/entities`: domain data access/types (e.g., post, portfolio).
- `src/shared`: shared UI, hooks, and utilities.
- `src/content`: MDX posts and portfolios.

## Conventions
- Use absolute imports via the `@/` alias.
- Use `cn` from `@/shared` for all `className` composition.
- Prefer `React.Fragment` over shorthand fragments.
- Keep UI components within their FSD layer; avoid cross-layer imports.

## Commands
- `pnpm dev` (run only when requested)
- `pnpm build`
- `pnpm start`
- `pnpm lint`
