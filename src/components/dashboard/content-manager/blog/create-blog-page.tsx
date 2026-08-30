'use client';

import { Container } from '@/components/ui/container';
import { BlogForm } from './blog-form';
import { BlogFormData } from '@/lib/validations/blog.schema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import BackButton from '@/components/ui/back-button';
import { blogService } from '@/services/blog.service';

export function CreateBlogPage() {
	const router = useRouter();

	const handleSubmit = async (data: BlogFormData) => {
	try {
		const post = { ...data };
		await blogService.create(post);
		toast.success('Blog post created successfully!');
		router.push('/dashboard/content-manager');
	} catch (error) {
		console.error('Error creating blog post:', error);
		toast.error('Failed to create blog post.');
	}
};

	return (
		<Container className='py-8 max-w-2xl'>
			<div className='mb-6'>
				<BackButton href='/dashboard/content-manager' label='Back to Dashboard' />
			</div>

			<div className='space-y-6'>
				<div>
					<h1 className='text-3xl font-bold'>Create Blog Post</h1>
					<p className='text-muted-foreground mt-1'>Write a new blog post</p>
				</div>

				<div className='p-6 rounded-xl border border-border/50 bg-card/30'>
					<BlogForm onSubmit={handleSubmit} />
				</div>
			</div>
		</Container>
	);
}