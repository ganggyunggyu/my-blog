import { getAllPosts } from '@/entities/post';
import { HeroSection } from '@/features/hero-section';
import { SocialLinks } from '@/features/social-links';
import { BlogSection } from '@/features/blog-section';
import { Bookshelf } from '@/features/bookshelf';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="space-y-0">
      <HeroSection />
      <Bookshelf posts={posts} />
      <SocialLinks />
      <BlogSection />
    </div>
  );
}
