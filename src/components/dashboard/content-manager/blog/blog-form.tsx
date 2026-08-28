'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { blogSchema, BlogFormData } from '@/lib/validations/blog.schema';
import { BlogFormProps } from '@/types/blog.types';



export function BlogForm({
	defaultValues,
	onSubmit,
	isLoading = false,
}: BlogFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<BlogFormData>({
		resolver: zodResolver(blogSchema),
		defaultValues,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			<div className='space-y-2'>
				<Label htmlFor='title'>Post Title</Label>
				<Input
					id='title'
					placeholder='Enter your post title'
					{...register('title')}
				/>
				{errors.title && (
					<p className='text-sm text-red-500'>{errors.title.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='body'>Content</Label>
				<Textarea
					id='body'
					placeholder='Write your blog post content...'
					className='min-h-50'
					{...register('body')}
				/>
				{errors.body && (
					<p className='text-sm text-red-500'>{errors.body.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='coverImage'>Cover Image URL</Label>
				<Input
					id='coverImage'
					placeholder='https://example.com/image.jpg'
					{...register('coverImage')}
				/>
				{errors.coverImage && (
					<p className='text-sm text-red-500'>{errors.coverImage.message}</p>
				)}
			</div>

			<Button
				type='submit'
				className='w-full bg-purple-600 hover:bg-purple-700'
				disabled={isLoading}
			>
				{isLoading ? 'Saving...' : 'Save Post'}
			</Button>
		</form>
	);
}
