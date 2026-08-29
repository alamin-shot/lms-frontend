'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { courseSchema, CourseFormData } from '@/lib/validations/course.schema';
import { CourseFormProps } from '@/types/instructor.types';

export function CourseForm({
	defaultValues,
	onSubmit,
	isLoading = false,
}: CourseFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CourseFormData>({
		resolver: zodResolver(courseSchema),
		defaultValues,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			<div className='space-y-2'>
				<Label htmlFor='title'>Course Title</Label>
				<Input
					id='title'
					placeholder='e.g. Complete Web Development Bootcamp'
					{...register('title')}
				/>
				{errors.title && (
					<p className='text-sm text-red-500'>{errors.title.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='description'>Description</Label>
				<Textarea
					id='description'
					placeholder='Describe your course...'
					className='min-h-30'
					{...register('description')}
				/>
				{errors.description && (
					<p className='text-sm text-red-500'>{errors.description.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='slug'>Course Slug</Label>
				<Input
					id='slug'
					placeholder='e.g. web-development-bootcamp'
					{...register('slug')}
				/>
				<p className='text-xs text-muted-foreground'>
					This will be the URL: /courses/your-slug
				</p>
				{errors.slug && (
					<p className='text-sm text-red-500'>{errors.slug.message}</p>
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
				{isLoading ? 'Saving...' : 'Save Course'}
			</Button>
		</form>
	);
}
