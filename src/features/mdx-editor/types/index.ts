/**
 * MDX 에디터 타입 정의
 */

export type ContentType = 'post' | 'portfolio';

export interface PostMetadata {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

export interface PortfolioMetadata {
  title: string;
  description: string;
  date: string;
  tags: string[];
  period?: string;
  role?: string;
  github?: string;
  demo?: string;
  featured: boolean;
}
