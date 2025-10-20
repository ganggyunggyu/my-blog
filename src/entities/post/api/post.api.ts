import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostMeta, Post } from "../model/post.types";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // 읽기 시간 계산 (평균 분당 200단어, 한글은 500자)
      const words = content.split(/\s+/).length;
      const koreanChars = (content.match(/[\uac00-\ud7af]/g) || []).length;
      const readingTime = Math.ceil((words / 200 + koreanChars / 500) / 2);

      // 실제 콘텐츠 길이 (공백 제외)
      const contentLength = content.replace(/\s/g, "").length;

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        excerpt: data.excerpt || "",
        readingTime,
        contentLength,
      };
    });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // 읽기 시간 계산
    const words = content.split(/\s+/).length;
    const koreanChars = (content.match(/[\uac00-\ud7af]/g) || []).length;
    const readingTime = Math.ceil((words / 200 + koreanChars / 500) / 2);

    // 실제 콘텐츠 길이
    const contentLength = content.replace(/\s/g, "").length;

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      excerpt: data.excerpt || "",
      readingTime,
      contentLength,
      content,
    };
  } catch {
    return null;
  }
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}
