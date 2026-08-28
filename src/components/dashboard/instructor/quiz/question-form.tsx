'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	questionSchema,
	QuestionFormData,
} from '@/lib/validations/quiz.schema';

interface QuestionFormProps {
	defaultValues?: Partial<QuestionFormData>;
	onSubmit: (data: QuestionFormData) => void;
	isLoading?: boolean;
}

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
						<RadioGroup
							// eslint-disable-next-line react-hooks/incompatible-library
							value={watch('correctAnswer')}
							onValueChange={(value) => setValue('correctAnswer', value)}
							className='flex items-center'
						>
							<RadioGroupItem
								value={options[index] || ''}
								id={`option-${index}`}
							/>
						</RadioGroup>
					</div>
				))}
				{errors.options && (
					<p className='text-sm text-red-500'>{errors.options.message}</p>
				)}
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
