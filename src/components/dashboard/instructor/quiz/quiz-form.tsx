'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { quizSchema, QuizFormData } from '@/lib/validations/quiz.schema';

interface QuizFormProps {
	defaultValues?: Partial<QuizFormData>;
	onSubmit: (data: QuizFormData) => void;
	isLoading?: boolean;
}

export function QuizForm({
	defaultValues,
	onSubmit,
	isLoading = false,
}: QuizFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<QuizFormData>({
		resolver: zodResolver(quizSchema),
		defaultValues,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			<div className='space-y-2'>
				<Label htmlFor='title'>Quiz Title</Label>
				<Input
					id='title'
					placeholder='e.g. Web Development Basics Quiz'
					{...register('title')}
				/>
				{errors.title && (
					<p className='text-sm text-red-500'>{errors.title.message}</p>
				)}
			</div>

			<Button
				type='submit'
				className='w-full bg-purple-600 hover:bg-purple-700'
				disabled={isLoading}
			>
				{isLoading ? 'Saving...' : 'Save Quiz'}
			</Button>
		</form>
	);
}
