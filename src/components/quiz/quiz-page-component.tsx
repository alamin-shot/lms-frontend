'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/container';
import BackButton from '@/components/ui/back-button';
import { QuizTaker } from './quiz-taker';
import { quizService } from '@/services/quiz.service';
import { Quiz } from '@/types/quiz.types';
import { useAuth } from '@/lib/hooks/use-auth';
import { redirect } from 'next/navigation';

interface QuizPageComponentProps {
	courseSlug: string;
	courseId: number;
}

export function QuizPageComponent({
	courseSlug,
	courseId,
}: QuizPageComponentProps) {
	const { isAuthenticated } = useAuth();
	const [quiz, setQuiz] = useState<Quiz | null>(null);
	const [loading, setLoading] = useState(true);
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		if (!isAuthenticated) {
			redirect('/login');
		}

		const fetchQuiz = async () => {
			try {
				const quizData = await quizService.getQuizByCourse(courseId);
				setQuiz(quizData);
			} catch (error) {
				console.error('Error fetching quiz:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchQuiz();
	}, [courseId, isAuthenticated]);

	const handleQuizComplete = async (score: number, answers: string[]) => {
		setIsComplete(true);
		// The score is already saved by the QuizTaker
	};

	if (loading) {
		return (
			<Container className='py-8'>
				<div className='flex items-center justify-center min-h-[60vh]'>
					<p className='text-muted-foreground'>Loading quiz...</p>
				</div>
			</Container>
		);
	}

	if (!quiz) {
		return (
			<Container className='py-8'>
				<div className='mb-6'>
					<BackButton
						href={`/dashboard/student/courses/${courseSlug}`}
						label='Back to Course'
					/>
				</div>
				<div className='text-center py-12'>
					<h3 className='text-lg font-semibold'>No Quiz Available</h3>
					<p className='text-muted-foreground'>
						This course doesnt have a quiz yet.
					</p>
					<BackButton
						href={`/dashboard/student/courses/${courseSlug}`}
						label='Back to Course'
					/>
				</div>
			</Container>
		);
	}

	if (isComplete) {
		return (
			<Container className='py-8'>
				<div className='mb-6'>
					<BackButton
						href={`/dashboard/student/courses/${courseSlug}`}
						label='Back to Course'
					/>
				</div>
				<div className='text-center py-12'>
					<h3 className='text-lg font-semibold'>Quiz Complete!</h3>
					<p className='text-muted-foreground'>Check your results above.</p>
				</div>
			</Container>
		);
	}

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
