import { BlogSection } from '@/components/blog';
import { blogPosts } from '@/mocks';

export default function BlogPage() {
	return <BlogSection posts={blogPosts} />;
}
