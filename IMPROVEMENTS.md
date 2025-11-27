# 코드 개선점 분석 보고서

> 분석일: 2025-11-27
> 분석 대상: kkk-blog (Next.js 15 + React 19 + TypeScript + FSD)
> 총 코드 라인: 1908줄

## 요약

- 🔴 Critical: 1건
- 🟠 High: 3건
- 🟡 Medium: 4건
- 🟢 Low: 11건

**⚠️ 중요**: portfolio.api.ts와 post.api.ts 간 로직 중복이 심각합니다!

---

## 🔴 Critical Issues

### [CRIT-001] 프로덕션 코드에 디버그 로그 남아있음

**위치**: [src/app/page.tsx:9](src/app/page.tsx#L9)

**문제**:
```typescript
export default function Home() {
  const posts = getAllPosts();
  console.log('asd');  // ← 이거
  return (
```

**영향**:
- 프로덕션 환경에서 불필요한 콘솔 출력
- 코드 품질 저하 및 프로페셔널하지 않음
- 빌드 시 ESLint 경고 발생 가능

**해결 방안**:
```typescript
export default function Home() {
  const posts = getAllPosts();
  // console.log 제거
  return (
```

**검증 방법**:
```bash
pnpm lint
grep -r "console.log" src/
```

---

## 🟠 High Priority Issues

### [HIGH-001] readingTime 계산 로직 중복

**위치**:
- [src/entities/post/api/post.api.ts:22-24](src/entities/post/api/post.api.ts#L22-L24)
- [src/entities/post/api/post.api.ts:48-50](src/entities/post/api/post.api.ts#L48-L50)

**문제**:
`getAllPosts`와 `getPostBySlug` 함수에서 동일한 readingTime 계산 로직이 중복됨

**현재 코드**:
```typescript
// getAllPosts 함수 내부
const words = content.split(/\s+/).length;
const koreanChars = (content.match(/[\uac00-\ud7af]/g) || []).length;
const readingTime = Math.ceil((words / 200 + koreanChars / 500) / 2);

// getPostBySlug 함수 내부 - 완전히 동일
const words = content.split(/\s+/).length;
const koreanChars = (content.match(/[\uac00-\ud7af]/g) || []).length;
const readingTime = Math.ceil((words / 200 + koreanChars / 500) / 2);
```

**영향**:
- DRY 원칙 위반
- 로직 변경 시 두 군데 모두 수정해야 함
- 유지보수성 저하

**해결 방안**:
```typescript
// src/entities/post/lib/reading-time.ts (새 파일)
export const calculateReadingTime = (content: string): number => {
  const words = content.split(/\s+/).length;
  const koreanChars = (content.match(/[\uac00-\ud7af]/g) || []).length;
  return Math.ceil((words / 200 + koreanChars / 500) / 2);
};

export const calculateContentLength = (content: string): number => {
  return content.replace(/\s/g, '').length;
};

// post.api.ts에서 사용
import { calculateReadingTime, calculateContentLength } from '../lib/reading-time';

// getAllPosts 함수 내부
const readingTime = calculateReadingTime(content);
const contentLength = calculateContentLength(content);
```

**검증 방법**:
- 기존 테스트 통과 확인
- 포스트 목록과 상세 페이지에서 readingTime 정상 표시 확인

---

### [HIGH-002] contentLength 계산 로직 중복

**위치**:
- [src/entities/post/api/post.api.ts:26](src/entities/post/api/post.api.ts#L26)
- [src/entities/post/api/post.api.ts:52](src/entities/post/api/post.api.ts#L52)

**문제**:
`getAllPosts`와 `getPostBySlug` 함수에서 동일한 contentLength 계산 로직이 중복됨

**해결 방안**:
HIGH-001과 동일한 방식으로 `calculateContentLength` 함수로 추출

---

### [HIGH-003] 🚨 portfolio.api.ts와 post.api.ts 간 심각한 코드 중복

**위치**:
- [src/entities/portfolio/api/portfolio.api.ts:22-26](src/entities/portfolio/api/portfolio.api.ts#L22-L26)
- [src/entities/portfolio/api/portfolio.api.ts:54-58](src/entities/portfolio/api/portfolio.api.ts#L54-L58)

**문제**:
portfolio.api.ts가 post.api.ts와 **완전히 동일한 로직**을 복사-붙여넣기한 상태입니다.

```typescript
// portfolio.api.ts - getAllPortfolios 함수 (라인 22-24)
const words = content.split(/\s+/).length;
const koreanChars = (content.match(/[\uac00-\ud7af]/g) || []).length;
const readingTime = Math.ceil((words / 200 + koreanChars / 500) / 2);
const contentLength = content.replace(/\s/g, '').length;

// portfolio.api.ts - getPortfolioBySlug 함수 (라인 54-56) - 동일
// post.api.ts - getAllPosts, getPostBySlug 함수도 동일
```

**영향**:
- **심각한 DRY 원칙 위반** - 4군데에서 동일 로직 반복
- 로직 변경 시 4군데 모두 수정 필요
- 버그 발생 시 4군데 모두 영향
- 유지보수 비용 급증

**해결 방안**:
```typescript
// src/shared/lib/content-utils.ts (새 파일 - shared 계층에 배치)
export const calculateReadingTime = (content: string): number => {
  const words = content.split(/\s+/).length;
  const koreanChars = (content.match(/[\uac00-\ud7af]/g) || []).length;
  return Math.ceil((words / 200 + koreanChars / 500) / 2);
};

export const calculateContentLength = (content: string): number => {
  return content.replace(/\s/g, '').length;
};

// 사용 예시 - post.api.ts
import { calculateReadingTime, calculateContentLength } from '@/shared/lib/content-utils';

export const getAllPosts = (): PostMeta[] => {
  // ...
  const readingTime = calculateReadingTime(content);
  const contentLength = calculateContentLength(content);
  // ...
};

// 사용 예시 - portfolio.api.ts
import { calculateReadingTime, calculateContentLength } from '@/shared/lib/content-utils';

export const getAllPortfolios = (): PortfolioMeta[] => {
  // ...
  const readingTime = calculateReadingTime(content);
  const contentLength = calculateContentLength(content);
  // ...
};
```

**검증 방법**:
```bash
# 중복 코드 확인
grep -rn "content.split(/\\\s+/).length" src/entities/

# 수정 후 테스트
pnpm build
# 포스트 목록/상세, 포트폴리오 목록/상세 모두 확인
```

---

## 🟡 Medium Priority Issues

### [MED-001] Tailwind CSS duration 클래스 오타

**위치**: [src/widgets/header/Header.tsx:135](src/widgets/header/Header.tsx#L135)

**문제**:
```tsx
<div className="... hover:scale-110 transition-all duration-30 h-[50px]">
```
`duration-30`은 존재하지 않는 Tailwind 클래스입니다. `duration-300` (300ms)를 의도한 것으로 보임.

**영향**:
- 애니메이션 duration이 적용되지 않음
- 기본값(150ms)으로 동작

**해결 방안**:
```tsx
<div className="... hover:scale-110 transition-all duration-300 h-[50px]">
```

**검증 방법**:
- 모바일에서 테마 토글 버튼 호버 시 애니메이션 확인

---

### [MED-002] 예외 처리에서 bare catch 사용

**위치**: [src/entities/post/api/post.api.ts:64](src/entities/post/api/post.api.ts#L64)

**문제**:
```typescript
} catch {
  return null;
}
```

**영향**:
- 어떤 에러가 발생했는지 알 수 없음
- 파일이 없는 경우와 파싱 에러를 구분할 수 없음
- 디버깅 어려움

**해결 방안**:
```typescript
} catch (error) {
  // 개발 환경에서는 에러 로깅
  if (process.env.NODE_ENV === 'development') {
    console.error(`Failed to load post: ${slug}`, error);
  }
  return null;
}
```

---

### [MED-003] portfolio.api.ts에서도 bare catch 사용

**위치**: [src/entities/portfolio/api/portfolio.api.ts:76](src/entities/portfolio/api/portfolio.api.ts#L76)

**문제**:
post.api.ts와 동일한 문제

**해결 방안**:
```typescript
} catch (error) {
  if (process.env.NODE_ENV === 'development') {
    console.error(`Failed to load portfolio: ${slug}`, error);
  }
  return null;
}
```

---

### [MED-004] navLinks 배열 매 렌더링마다 재생성

**위치**: [src/widgets/header/Header.tsx:37-42](src/widgets/header/Header.tsx#L37-L42)

**문제**:
```typescript
export const Header = () => {
  // ...
  const navLinks = [
    { href: '/', label: '홈' },
    { href: '/portfolio', label: '포트폴리오' },
    { href: '/posts', label: '포스트' },
    { href: '/editor', label: '에디터' },
  ];
```

**영향**:
- 매 렌더링마다 새로운 배열 생성
- 불필요한 메모리 할당
- 성능 저하 (미미하지만)

**해결 방안**:
```typescript
// 컴포넌트 외부로 이동
const NAV_LINKS = [
  { href: '/', label: '홈' },
  { href: '/portfolio', label: '포트폴리오' },
  { href: '/posts', label: '포스트' },
  { href: '/editor', label: '에디터' },
] as const;

export const Header = () => {
  // ...
  return (
    // ...
    {NAV_LINKS.map((link) => (
```

---

## 🟢 Low Priority Issues

### [LOW-001] 날짜 정렬 로직 개선 필요

**위치**: [src/entities/post/api/post.api.ts:39](src/entities/post/api/post.api.ts#L39)

**문제**:
```typescript
return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
```
문자열 비교로 날짜 정렬. ISO 8601 형식이면 작동하지만, Date 객체로 변환하는 것이 더 명확함.

**해결 방안**:
```typescript
return posts.sort((a, b) =>
  new Date(b.date).getTime() - new Date(a.date).getTime()
);
```

---

### [LOW-002] useScrollAnimation ref 타입 제한적

**위치**: [src/shared/hooks/useScrollAnimation.ts:13](src/shared/hooks/useScrollAnimation.ts#L13)

**문제**:
```typescript
const ref = useRef<HTMLDivElement>(null);
```
HTMLDivElement로만 제한되어 다른 요소에 사용 불가

**해결 방안**:
```typescript
const ref = useRef<HTMLElement>(null);
```

---

### [LOW-003] 매직 넘버 하드코딩 (Bookshelf)

**위치**: [src/features/bookshelf/Bookshelf.tsx:19](src/features/bookshelf/Bookshelf.tsx#L19)

**문제**:
```typescript
const displayPosts = posts.slice(0, 10);
```

**해결 방안**:
```typescript
const MAX_DISPLAY_POSTS = 10;
const displayPosts = posts.slice(0, MAX_DISPLAY_POSTS);
```

---

### [LOW-004] colorsByTag 객체 매 렌더링마다 재생성

**위치**: [src/features/bookshelf/Book.tsx:12-24](src/features/bookshelf/Book.tsx#L12-L24)

**문제**:
```typescript
export const Book = ({ post, index }: Props) => {
  const colorsByTag: Record<string, string> = {
    'React': '#61dafb',
    // ...
  };
```

**해결 방안**:
```typescript
// 컴포넌트 외부로 이동
const COLORS_BY_TAG: Record<string, string> = {
  'React': '#61dafb',
  'Next.js': '#000000',
  'TypeScript': '#3178c6',
  // ...
  'default': '#d4a574',
} as const;

export const Book = ({ post, index }: Props) => {
```

---

### [LOW-005] 책 높이 계산 매직 넘버들

**위치**: [src/features/bookshelf/Book.tsx:32-43](src/features/bookshelf/Book.tsx#L32-L43)

**문제**:
```typescript
const baseHeight = 180;
const maxHeight = 300;
const scaledHeight = baseHeight + (contentLength / 5000) * (maxHeight - baseHeight);
```

**해결 방안**:
```typescript
// 컴포넌트 외부에 상수 정의
const BOOK_HEIGHT_CONFIG = {
  MIN: 180,
  MAX: 300,
  CONTENT_LENGTH_REFERENCE: 5000, // 5000자를 기준으로 스케일링
  DEFAULT: 200,
} as const;

const getBookHeight = (contentLength?: number): number => {
  if (!contentLength) return BOOK_HEIGHT_CONFIG.DEFAULT;

  const { MIN, MAX, CONTENT_LENGTH_REFERENCE } = BOOK_HEIGHT_CONFIG;
  const scaledHeight = MIN + (contentLength / CONTENT_LENGTH_REFERENCE) * (MAX - MIN);

  return Math.min(Math.max(scaledHeight, MIN), MAX);
};
```

---

### [LOW-006] 스크롤 이벤트 최적화 필요 (Header)

**위치**: [src/widgets/header/Header.tsx:14-21](src/widgets/header/Header.tsx#L14-L21)

**문제**:
```typescript
useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll);
```
스크롤 이벤트가 매우 빈번하게 발생하는데 throttle/debounce 없음

**해결 방안**:
```typescript
// src/shared/lib/throttle.ts (새 파일)
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

// Header.tsx
useEffect(() => {
  const handleScroll = throttle(() => {
    setScrolled(window.scrollY > 20);
  }, 100); // 100ms마다 실행

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

### [LOW-007] 스크롤 이벤트 최적화 필요 (ScrollToTop)

**위치**: [src/shared/ui/scroll-to-top/ScrollToTop.tsx:8-18](src/shared/ui/scroll-to-top/ScrollToTop.tsx#L8-L18)

**문제**:
LOW-006과 동일한 문제

**해결 방안**:
```typescript
useEffect(() => {
  const toggleVisibility = throttle(() => {
    setIsVisible(window.scrollY > 300);
  }, 100);

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  return () => window.removeEventListener('scroll', toggleVisibility);
}, []);
```

---

### [LOW-008] 스크롤 임계값 매직 넘버

**위치**: [src/shared/ui/scroll-to-top/ScrollToTop.tsx:10](src/shared/ui/scroll-to-top/ScrollToTop.tsx#L10)

**문제**:
```typescript
if (window.scrollY > 300) {
```

**해결 방안**:
```typescript
const SCROLL_THRESHOLD = 300;

const toggleVisibility = () => {
  setIsVisible(window.scrollY > SCROLL_THRESHOLD);
};
```

---

### [LOW-009] ThemeToggle 불필요한 복잡성

**위치**: [src/shared/ui/theme-toggle/ThemeToggle.tsx:18-21](src/shared/ui/theme-toggle/ThemeToggle.tsx#L18-L21)

**문제**:
```typescript
const handleToggle = () => {
  setIsAnimating(true);
  setTimeout(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setIsAnimating(false);
  }, 150);
};
```
setTimeout으로 지연시킬 필요가 있는가? next-themes가 자체적으로 애니메이션을 처리함

**해결 방안**:
```typescript
const handleToggle = () => {
  setIsAnimating(true);
  setTheme(theme === 'dark' ? 'light' : 'dark');
  setTimeout(() => setIsAnimating(false), 150);
};
```
또는 아예 단순화:
```typescript
const handleToggle = () => {
  setTheme(theme === 'dark' ? 'light' : 'dark');
};
```

---

### [LOW-010] React.Fragment 명시적 사용 불필요

**위치**: [src/app/posts/[slug]/page.tsx:50](src/app/posts/[slug]/page.tsx#L50)

**문제**:
```typescript
return (
  <React.Fragment>
    <ReadingProgress />
```

**해결 방안**:
```typescript
return (
  <>
    <ReadingProgress />
```

---

### [LOW-011] isRightSide 네이밍 헷갈림

**위치**: [src/features/bookshelf/Book.tsx:50](src/features/bookshelf/Book.tsx#L50)

**문제**:
```typescript
const isRightSide = index < 5; // 0-4번 인덱스(1-5번째 책)는 우측, 5번 이후는 좌측
```
변수명이 "책이 우측에 있는지"가 아니라 "툴팁이 우측에 표시되는지"를 의미함

**해결 방안**:
```typescript
const showTooltipOnRight = index < 5; // 0-4번 책은 툴팁을 우측에 표시
```

---

## 개선 로드맵

### Phase 1: 긴급 수정 (Critical + High) 🔥
1. [ ] CRIT-001: console.log 제거
2. [ ] **HIGH-003: 🚨 shared/lib/content-utils.ts 생성 및 적용 (최우선)**
   - calculateReadingTime, calculateContentLength 함수 추출
   - post.api.ts와 portfolio.api.ts 모두 수정
3. [ ] HIGH-001: ~~readingTime 중복 제거~~ (HIGH-003에 포함됨)
4. [ ] HIGH-002: ~~contentLength 중복 제거~~ (HIGH-003에 포함됨)

### Phase 2: 품질 개선 (Medium)
1. [ ] MED-001: duration-30 → duration-300 수정
2. [ ] MED-002: post.api.ts catch 블록에 에러 로깅 추가
3. [ ] MED-003: portfolio.api.ts catch 블록에 에러 로깅 추가
4. [ ] MED-004: navLinks 배열 컴포넌트 외부로 이동

### Phase 3: 리팩토링 (Low)
1. [ ] LOW-001~005: 매직 넘버 상수화
2. [ ] LOW-006~007: 스크롤 이벤트 throttle 추가
3. [ ] LOW-008~011: 코드 가독성 개선

---

## 추가 권장 사항

### 1. FSD 아키텍처 준수 여부
현재 프로젝트는 FSD 아키텍처를 잘 따르고 있습니다:
- ✅ entities (post) - 비즈니스 엔티티
- ✅ features (bookshelf, hero-section, etc) - 기능 단위
- ✅ widgets (header) - 복합 UI 블록
- ✅ shared (ui, hooks, lib) - 공통 코드

Import 규칙도 잘 지켜지고 있음 (상위 계층이 하위 계층만 import)

### 2. 타입 안전성
- ✅ TypeScript strict 모드 활성화
- ✅ Props 인터페이스 정의
- ✅ @/* 절대 경로 사용

### 3. 성능 최적화
- ✅ useMemo로 필터링 최적화 (PostList)
- ✅ IntersectionObserver로 스크롤 애니메이션
- ⚠️ 스크롤 이벤트 throttle 추가 권장

### 4. 접근성
- ✅ aria-label 적용
- ✅ semantic HTML
- ✅ 키보드 네비게이션 가능

### 5. 코드 스타일
- ✅ 구조분해할당 사용
- ✅ 화살표 함수 사용
- ✅ 일관된 네이밍 규칙

---

## 분석 방법론

이 보고서는 다음 체크리스트를 기반으로 작성되었습니다:

### JavaScript/TypeScript 공통
- [x] 구조분해할당 사용
- [x] 네이밍 규칙 준수
- [x] 에러 처리 패턴
- [x] 매직 넘버/문자열 체크

### React/Next.js
- [x] 컴포넌트 구조
- [x] FSD 아키텍처 준수
- [x] 상태 관리 패턴
- [x] 성능 최적화 (useMemo, useCallback)

### 로직 에러 체크
- [x] 경계 조건 처리
- [x] 타입 일치성
- [x] 조건문 정확성
- [x] 예외 처리

### 설계 결함 체크
- [x] 단일 책임 원칙 (SRP)
- [x] 코드 중복 (DRY)
- [x] 인터페이스 일관성

### 성능 문제 체크
- [x] N+1 문제
- [x] 불필요한 리렌더링
- [x] 이벤트 리스너 최적화

---

**총평**: 전반적으로 깔끔하고 잘 구조화된 코드입니다. FSD 아키텍처를 잘 따르고 있으며, TypeScript를 적극 활용하고 있습니다. 주요 개선점은 코드 중복 제거와 매직 넘버 상수화입니다.
