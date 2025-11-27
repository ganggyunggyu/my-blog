import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PortfolioMeta, Portfolio } from '../model/portfolio.types';
import {
  calculateReadingTime,
  calculateContentLength,
} from '@/shared/lib/content-utils';

const portfoliosDirectory = path.join(process.cwd(), 'src/content/portfolios');

export const getAllPortfolios = (): PortfolioMeta[] => {
  if (!fs.existsSync(portfoliosDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(portfoliosDirectory);
  const portfolios = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(portfoliosDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const readingTime = calculateReadingTime(content);
      const contentLength = calculateContentLength(content);

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        thumbnail: data.thumbnail,
        github: data.github,
        demo: data.demo,
        featured: data.featured || false,
        period: data.period,
        role: data.role,
        readingTime,
        contentLength,
      };
    });

  return portfolios.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getPortfolioBySlug = (slug: string): Portfolio | null => {
  try {
    const fullPath = path.join(portfoliosDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const readingTime = calculateReadingTime(content);
    const contentLength = calculateContentLength(content);

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      thumbnail: data.thumbnail,
      github: data.github,
      demo: data.demo,
      featured: data.featured || false,
      period: data.period,
      role: data.role,
      readingTime,
      contentLength,
      content,
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Failed to load portfolio: ${slug}`, error);
    }
    return null;
  }
};

export const getPortfolioSlugs = (): string[] => {
  if (!fs.existsSync(portfoliosDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(portfoliosDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
};
