import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostMeta, Post } from '../model/post.types';
import {
  calculateReadingTime,
  calculateContentLength,
} from '@/shared/lib/content-utils';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export const getAllPosts = (): PostMeta[] => {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const readingTime = calculateReadingTime(content);
      const contentLength = calculateContentLength(content);

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        excerpt: data.excerpt || '',
        readingTime,
        contentLength,
      };
    });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getPostBySlug = (slug: string): Post | null => {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const readingTime = calculateReadingTime(content);
    const contentLength = calculateContentLength(content);

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      readingTime,
      contentLength,
      content,
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Failed to load post: ${slug}`, error);
    }
    return null;
  }
};

export const getPostSlugs = (): string[] => {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
};
