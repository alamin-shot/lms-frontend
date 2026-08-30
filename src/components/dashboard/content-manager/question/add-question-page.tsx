'use client';

import { Container } from '@/components/ui/container';
import BackButton from '@/components/ui/back-button';
import { QuestionForm } from '@/components/dashboard/instructor/quiz/question-form';
import { QuestionFormData } from '@/lib/validations/quiz.schema';
import { CMAddQuestionPageProps } from '@/types/content-manager.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { questionService } from '@/services/question.service';

export function CMAddQuestionPage({ course, quiz }: CMAddQuestionPageProps) {
	const router = useRouter();

	const handleSubmit = async (data: QuestionFormData) => {
		try {
			await questionService.create(quiz.id, data);
			toast.success('Question added successfully!');
			// Use router.refresh() to refetch data, then push
			router.refresh();
			setTimeout(() => {
				router.push(
					`/dashboard/content-manager/courses/${course.id}/quiz/questions`
				);
			}, 100);
		} catch (error) {
			console.error('Error adding question:', error);
			toast.error('Failed to add question.');
		}
	};

	return (
		<Container className='py-8 max-w-2xl'>
			<div className='mb-6'>
				<BackButton
					href={`/dashboard/content-manager/courses/${course.id}/quiz/questions`}
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