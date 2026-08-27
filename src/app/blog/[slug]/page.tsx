import { BlogDetailPage } from '@/components/blog';
import { blogPosts } from '@/mocks';
import { notFound } from 'next/navigation';

export default async function BlogDetailPageRoute({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = blogPosts.find((p) => p.documentId === slug);

	if (!post) {
		notFound();
	}

	return <BlogDetailPage post={post} />;
}
