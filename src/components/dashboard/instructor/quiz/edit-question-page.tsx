'use client';

import { Container } from '@/components/ui/container';
import { QuestionForm } from './question-form';
import { QuestionFormData } from '@/lib/validations/quiz.schema';
import { Quiz, Question } from '@/types/quiz.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import BackButton from '@/components/ui/back-button';
import { Course } from '@/types/course.types';

interface EditQuestionPageProps {
	course: Course;
	quiz: Quiz;
	question: Question;
}

export function EditQuestionPage({
	course,
	quiz,
	question,
}: EditQuestionPageProps) {
	const router = useRouter();

	const defaultValues: QuestionFormData = {
		questionText: question.questionText,
		options: question.options,
		correctAnswer: question.correctAnswer,
	};

	const handleSubmit = (data: QuestionFormData) => {
		console.log('Updated question:', data);
		toast.success('Question updated successfully!');
		router.push(`/dashboard/instructor/courses/${course.id}/quiz/questions`);
		// TODO: Save to backend
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
					<h1 className='text-3xl font-bold'>Edit Question</h1>
					<p className='text-muted-foreground mt-1'>
						Update question for {quiz.title}
					</p>
				</div>

				<div className='p-6 rounded-xl border border-border/50 bg-card/30'>
					<QuestionForm defaultValues={defaultValues} onSubmit={handleSubmit} />
				</div>
			</div>
		</Container>
	);
}
