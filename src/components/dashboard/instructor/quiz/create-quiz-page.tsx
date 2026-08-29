'use client';

import { Container } from '@/components/ui/container';
import { QuizForm } from './quiz-form';
import { QuizFormData } from '@/lib/validations/quiz.schema';
import { CreateQuizPageProps } from '@/types/instructor.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import BackButton from '@/components/ui/back-button';
import { quizService } from '@/services/quiz.service';

export function CreateQuizPage({ course }: CreateQuizPageProps) {
	const router = useRouter();

	const handleSubmit = async (data: QuizFormData) => {
		try {
			await quizService.create(course.id, data);
			toast.success('Quiz created successfully!');
			router.push(`/dashboard/instructor/courses/${course.id}/quiz`);
		} catch (error) {
			console.error('Error creating quiz:', error);
			toast.error('Failed to create quiz. Please try again.');
		}
	};

	return (
		<Container className='py-8 max-w-2xl'>
			<div className='mb-6'>
				<BackButton
					href={`/dashboard/instructor/courses/${course.id}/quiz`}
					label='Back to Quiz'
				/>
			</div>

			<div className='space-y-6'>
				<div>
					<h1 className='text-3xl font-bold'>Create Quiz</h1>
					<p className='text-muted-foreground mt-1'>
						Create a quiz for {course.title}
					</p>
				</div>

				<div className='p-6 rounded-xl border border-border/50 bg-card/30'>
					<QuizForm onSubmit={handleSubmit} />
				</div>
			</div>
		</Container>
	);
}
