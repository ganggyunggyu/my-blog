import { getAllPosts } from "@/entities/post";
import { PostList } from "@/features/post-list";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">모든 포스트</h1>
      <PostList posts={posts} />
    </div>
  );
}
