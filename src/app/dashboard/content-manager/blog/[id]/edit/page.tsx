import { EditBlogPage } from '@/components/dashboard/content-manager/blog/edit-blog-page';
import { blogPosts } from '@/mocks/blog-posts';
import { notFound } from 'next/navigation';

export default async function EditBlogPageRoute({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const post = blogPosts.find((p) => p.id === parseInt(id));

	if (!post) {
		notFound();
	}

	return <EditBlogPage post={post} />;
}
