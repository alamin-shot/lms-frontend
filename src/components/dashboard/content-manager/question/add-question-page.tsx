'use client';

import { Container } from '@/components/ui/container';
import BackButton from '@/components/ui/back-button';
import { QuestionForm } from '@/components/dashboard/instructor/quiz/question-form';
import { QuestionFormData } from '@/lib/validations/quiz.schema';
import { CMAddQuestionPageProps } from '@/types/content-manager.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function CMAddQuestionPage({ course, quiz }: CMAddQuestionPageProps) {
	const router = useRouter();

	const handleSubmit = (data: QuestionFormData) => {
		console.log('New question:', data);
		toast.success('Question added successfully!');
		router.push(
			`/dashboard/content-manager/courses/${course.id}/quiz/questions`,
		);
		// TODO: Save to backend
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
