'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { lessonSchema, LessonFormData } from '@/lib/validations/lesson.schema';

interface LessonFormProps {
	defaultValues?: Partial<LessonFormData>;
	onSubmit: (data: LessonFormData) => void;
	isLoading?: boolean;
}

export function LessonForm({
	defaultValues,
	onSubmit,
	isLoading = false,
}: LessonFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LessonFormData>({
		resolver: zodResolver(lessonSchema),
		defaultValues,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			<div className='space-y-2'>
				<Label htmlFor='title'>Lesson Title</Label>
				<Input
					id='title'
					placeholder='e.g. Introduction to HTML'
					{...register('title')}
				/>
				{errors.title && (
					<p className='text-sm text-red-500'>{errors.title.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='content'>Content</Label>
				<Textarea
					id='content'
					placeholder='Write your lesson content...'
					className='min-h-[150px]'
					{...register('content')}
				/>
				{errors.content && (
					<p className='text-sm text-red-500'>{errors.content.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='videoUrl'>Video URL (optional)</Label>
				<Input
					id='videoUrl'
					placeholder='https://www.youtube.com/embed/...'
					{...register('videoUrl')}
				/>
				{errors.videoUrl && (
					<p className='text-sm text-red-500'>{errors.videoUrl.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='order'>Order</Label>
				<Input
					id='order'
					type='number'
					placeholder='0'
					{...register('order', { valueAsNumber: true })}
				/>
				<p className='text-xs text-muted-foreground'>
					Lower numbers appear first
				</p>
				{errors.order && (
					<p className='text-sm text-red-500'>{errors.order.message}</p>
				)}
			</div>

			<Button
				type='submit'
				className='w-full bg-purple-600 hover:bg-purple-700'
				disabled={isLoading}
			>
				{isLoading ? 'Saving...' : 'Save Lesson'}
			</Button>
		</form>
	);
}
