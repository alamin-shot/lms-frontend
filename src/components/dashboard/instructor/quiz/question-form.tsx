'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	questionSchema,
	QuestionFormData,
} from '@/lib/validations/quiz.schema';
import { QuestionFormProps } from '@/types/instructor.types';

export function QuestionForm({
	defaultValues,
	onSubmit,
	isLoading = false,
}: QuestionFormProps) {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<QuestionFormData>({
		resolver: zodResolver(questionSchema),
		defaultValues: defaultValues || {
			options: ['', '', '', ''],
		},
	});

	const options = watch('options');

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			<div className='space-y-2'>
				<Label htmlFor='questionText'>Question</Label>
				<Input
					id='questionText'
					placeholder='Enter your question...'
					{...register('questionText')}
				/>
				{errors.questionText && (
					<p className='text-sm text-red-500'>{errors.questionText.message}</p>
				)}
			</div>

			<div className='space-y-3'>
				<Label>Options (4 options required)</Label>
				{[0, 1, 2, 3].map((index) => (
					<div key={index} className='flex items-center gap-3'>
						<Input
							placeholder={`Option ${index + 1}`}
							{...register(`options.${index}`)}
						/>
					</div>
				))}
				{errors.options && (
					<p className='text-sm text-red-500'>{errors.options.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='correctAnswer'>Correct Answer</Label>
				<Select
					value={watch('correctAnswer') || undefined}
					onValueChange={(value) => setValue('correctAnswer', value || '')}
				>
					<SelectTrigger>
						<SelectValue placeholder='Select the correct answer' />
					</SelectTrigger>
					<SelectContent>
						{options.map((option, index) => (
							<SelectItem key={index} value={option}>
								{option || `Option ${index + 1}`}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.correctAnswer && (
					<p className='text-sm text-red-500'>{errors.correctAnswer.message}</p>
				)}
			</div>

			<Button
				type='submit'
				className='w-full bg-purple-600 hover:bg-purple-700'
				disabled={isLoading}
			>
				{isLoading ? 'Saving...' : 'Save Question'}
			</Button>
		</form>
	);
}
