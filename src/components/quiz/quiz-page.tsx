'use client';

import { Quiz } from '@/types/quiz.types';
import { Container } from '@/components/ui/container';
import { QuizTaker } from './quiz-taker';
import { useState } from 'react';
import { toast } from 'sonner';
import BackButton from '../ui/back-button';

interface QuizPageProps {
	quiz: Quiz;
	courseSlug: string;
}

export function QuizPage({ quiz, courseSlug }: QuizPageProps) {
	const [isComplete, setIsComplete] = useState(false);

	const handleQuizComplete = (score: number, answers: string[]) => {
		setIsComplete(true);
		toast.success(`Quiz complete! You scored ${score}%`);
		// TODO: Save results to backend
	};

	return (
		<Container className='py-8'>
			<div className='mb-6'>
				<BackButton
					href={`/dashboard/student/courses/${courseSlug}`}
					label='Back to Course'
				/>
			</div>

			<div className='max-w-3xl mx-auto'>
				<div className='mb-6'>
					<h1 className='text-3xl font-bold'>{quiz.title}</h1>
					<p className='text-muted-foreground mt-1'>
						{quiz.questions?.length || 0} questions
					</p>
				</div>

				<div className='p-6 rounded-xl border border-border/50 bg-card/30'>
					<QuizTaker quiz={quiz} onComplete={handleQuizComplete} />
				</div>
			</div>
		</Container>
	);
}
