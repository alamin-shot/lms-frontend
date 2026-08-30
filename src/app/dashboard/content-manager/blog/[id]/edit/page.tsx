import { EditBlogPage } from '@/components/dashboard/content-manager/blog/edit-blog-page';
import { blogService } from '@/services/blog.service';
import { BlogPost } from '@/types/blog.types';
import { notFound } from 'next/navigation';

export default async function EditBlogPageRoute({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	let post: BlogPost | null = null;

	try {
		const allPosts = await blogService.getAll();
		post = allPosts.find((p) => p.id === parseInt(id, 10)) || null;
		if (!post) {
			post = await blogService.getBySlug(id);
		}
	} catch {
		notFound();
	}

	if (!post) {
		notFound();
	}

	return <EditBlogPage post={post} />;
}
