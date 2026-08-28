'use client';

import { Container } from '@/components/ui/container';
import { QuizForm } from './quiz-form';
import { QuizFormData } from '@/lib/validations/quiz.schema';
import { Quiz } from '@/types/quiz.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import BackButton from '@/components/ui/back-button';
import { Course } from '@/types/course.types';

interface EditQuizPageProps {
	course: Course;
	quiz: Quiz;
}

export function EditQuizPage({ course, quiz }: EditQuizPageProps) {
	const router = useRouter();

	const defaultValues: QuizFormData = {
		title: quiz.title,
	};

	const handleSubmit = (data: QuizFormData) => {
		console.log('Updated quiz:', data);
		toast.success('Quiz updated successfully!');
		router.push(`/dashboard/instructor/courses/${course.id}/quiz`);
		// TODO: Save to backend
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
					<h1 className='text-3xl font-bold'>Edit Quiz</h1>
					<p className='text-muted-foreground mt-1'>
						Update quiz for {course.title}
					</p>
				</div>

				<div className='p-6 rounded-xl border border-border/50 bg-card/30'>
					<QuizForm defaultValues={defaultValues} onSubmit={handleSubmit} />
				</div>
			</div>
		</Container>
	);
}
