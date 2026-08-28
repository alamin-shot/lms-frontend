'use client';

import { Container } from '@/components/ui/container';
import  BackButton  from '@/components/ui/back-button';
import { QuizForm } from '@/components/dashboard/instructor/quiz/quiz-form';
import { QuizFormData } from '@/lib/validations/quiz.schema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CMCreateQuizPageProps } from '@/types/content-manager.types';


export function CMCreateQuizPage({ course }: CMCreateQuizPageProps) {
	const router = useRouter();

	const handleSubmit = (data: QuizFormData) => {
		console.log('New quiz:', data);
		toast.success('Quiz created successfully!');
		router.push(`/dashboard/content-manager/courses/${course.id}/quiz`);
		// TODO: Save to backend
	};

	return (
		<Container className='py-8 max-w-2xl'>
			<div className='mb-6'>
				<BackButton
					href={`/dashboard/content-manager/courses/${course.id}/quiz`}
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
