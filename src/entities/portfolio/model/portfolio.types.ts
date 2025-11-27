export interface PortfolioMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  period?: string;
  role?: string;
  readingTime?: number;
  contentLength?: number;
}

export interface Portfolio extends PortfolioMeta {
  content: string;
}
