'use client';

import { Container } from '@/components/ui/container';
import { QuestionForm } from './question-form';
import { QuestionFormData } from '@/lib/validations/quiz.schema';
import { AddQuestionPageProps } from '@/types/instructor.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import BackButton from '@/components/ui/back-button';
import { questionService } from '@/services/question.service';

export function AddQuestionPage({ course, quiz }: AddQuestionPageProps) {
	const router = useRouter();

	const handleSubmit = async (data: QuestionFormData) => {
		try {
			await questionService.create(quiz.id, data);
			toast.success('Question added successfully!');
			router.push(`/dashboard/instructor/courses/${course.id}/quiz/questions`);
		} catch (error) {
			console.error('Error adding question:', error);
			toast.error('Failed to add question. Please try again.');
		}
	};

	return (
		<Container className='py-8 max-w-2xl'>
			<div className='mb-6'>
				<BackButton
					href={`/dashboard/instructor/courses/${course.id}/quiz/questions`}
					label='Back to Questions'
				/>
			</div>

			<div className='space-y-6'>
				<div>
					<h1 className='text-3xl font-bold'>Add Question</h1>
					<p className='text-muted-foreground mt-1'>
						Add a new question to {quiz.title}
					</p>
				</div>

				<div className='p-6 rounded-xl border border-border/50 bg-card/30'>
					<QuestionForm onSubmit={handleSubmit} />
				</div>
			</div>
		</Container>
	);
}
