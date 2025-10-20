import { getAllPosts } from "@/entities/post";
import { HeroSection } from "@/features/hero-section";
import { RecentPosts } from "@/features/recent-posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="space-y-12">
      <HeroSection />
      <RecentPosts posts={posts} />
    </div>
  );
}
