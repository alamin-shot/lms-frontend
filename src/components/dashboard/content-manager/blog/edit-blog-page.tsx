'use client';

import { Container } from '@/components/ui/container';
import { BlogForm } from './blog-form';
import { BlogFormData } from '@/lib/validations/blog.schema';
import { EditBlogPageProps } from '@/types/blog.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import BackButton from '@/components/ui/back-button';
import { blogService } from '@/services/blog.service';

export function EditBlogPage({ post }: EditBlogPageProps) {
	const router = useRouter();

	const defaultValues: BlogFormData = {
		title: post.title,
		body: post.body,
		coverImage: post.coverImage || '',
	};

	const handleSubmit = async (data: BlogFormData) => {
		try {
			// Only send the fields that can be updated
			await blogService.update(post.id, data, post.documentId);
			toast.success('Blog post updated successfully!');
			router.push('/dashboard/content-manager');
		} catch (error) {
			console.error('Error updating blog post:', error);
			toast.error('Failed to update blog post.');
		}
	};

	return (
		<Container className='py-8 max-w-2xl'>
			<div className='mb-6'>
				<BackButton href='/dashboard/content-manager' label='Back to Dashboard' />
			</div>

			<div className='space-y-6'>
				<div>
					<h1 className='text-3xl font-bold'>Edit Blog Post</h1>
					<p className='text-muted-foreground mt-1'>Update your blog post</p>
				</div>

				<div className='p-6 rounded-xl border border-border/50 bg-card/30'>
					<BlogForm defaultValues={defaultValues} onSubmit={handleSubmit} />
				</div>
			</div>
		</Container>
	);
}