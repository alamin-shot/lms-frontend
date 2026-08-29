import { BlogDetailPage } from '@/components/blog';
import { blogService } from '@/services/blog.service';
import { notFound } from 'next/navigation';

export default async function BlogDetailPageRoute({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	let post;
	try {
		post = await blogService.getBySlug(slug);
	} catch {
		notFound();
	}

	if (!post) {
		notFound();
	}

	return <BlogDetailPage post={post} />;
}
