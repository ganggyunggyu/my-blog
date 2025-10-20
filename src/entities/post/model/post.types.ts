export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt?: string;
  readingTime?: number; // 분 단위
  contentLength?: number; // 글자 수
}

export interface Post extends PostMeta {
  content: string;
}
