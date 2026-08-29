import { BlogSection } from '@/components/blog';
import { blogService } from '@/services/blog.service';

export default async function BlogPage() {
	const posts = await blogService.getAll();
	return <BlogSection posts={posts} />;
}
