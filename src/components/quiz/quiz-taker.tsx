'use client';

import { useState } from 'react';
import { Quiz, Question, QuizTakerProps, QuizResult } from '@/types/quiz.types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle } from 'lucide-react';



export function QuizTaker({ quiz, onComplete }: QuizTakerProps) {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState<Record<number, string>>({});
	const [showResults, setShowResults] = useState(false);
	const [results, setResults] = useState<QuizResult[]>([]);

	const questions = quiz.questions || [];
	const totalQuestions = questions.length;
	const currentQuestion = questions[currentQuestionIndex];
	const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

	const handleAnswerSelect = (value: string) => {
		setAnswers((prev) => ({
			...prev,
			[currentQuestion.id]: value,
		}));
	};

	const handleNext = () => {
		if (isLastQuestion) {
			// Submit quiz
			const submittedAnswers = questions.map((q) => answers[q.id] || '');
			const quizResults = questions.map((q) => ({
				questionId: q.id,
				userAnswer: answers[q.id] || 'Not answered',
				isCorrect: (answers[q.id] || '') === q.correctAnswer,
				correctAnswer: q.correctAnswer,
			}));

			const correctCount = quizResults.filter((r) => r.isCorrect).length;
			const score = Math.round((correctCount / totalQuestions) * 100);

			setResults(quizResults);
			setShowResults(true);
			onComplete?.(score, submittedAnswers);
		} else {
			setCurrentQuestionIndex((prev) => prev + 1);
		}
	};

	const handlePrevious = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prev) => prev - 1);
		}
	};

	if (showResults) {
		const correctCount = results.filter((r) => r.isCorrect).length;
		const score = Math.round((correctCount / totalQuestions) * 100);
		const passed = score >= 70;

		return (
			<div className='space-y-6'>
				<div className='text-center py-8'>
					<h2 className='text-3xl font-bold mb-2'>Quiz Complete!</h2>
					<div className='flex items-center justify-center gap-4'>
						<span className='text-5xl font-bold text-purple-500'>{score}%</span>
						<Badge
							className={
								passed
									? 'bg-green-500/20 text-green-500'
									: 'bg-red-500/20 text-red-500'
							}
						>
							{passed ? '✅ Passed' : '❌ Failed'}
						</Badge>
					</div>
					<p className='text-muted-foreground mt-2'>
						{correctCount} out of {totalQuestions} correct
					</p>
				</div>

				<div className='space-y-4'>
					{questions.map((q, index) => {
						const result = results[index];
						return (
							<div
								key={q.id}
								className='p-4 rounded-lg border border-border/50'
							>
								<div className='flex items-start gap-3'>
									{result.isCorrect ? (
										<CheckCircle2 className='h-5 w-5 text-green-500 mt-0.5' />
									) : (
										<XCircle className='h-5 w-5 text-red-500 mt-0.5' />
									)}
									<div>
										<p className='font-medium'>{q.questionText}</p>
										<p className='text-sm text-muted-foreground'>
											Your answer:{' '}
											<span
												className={
													result.isCorrect ? 'text-green-500' : 'text-red-500'
												}
											>
												{result.userAnswer || 'Not answered'}
											</span>
										</p>
										{!result.isCorrect && (
											<p className='text-sm text-green-500'>
												Correct answer: {result.correctAnswer}
											</p>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			{/* Progress */}
			<div className='flex items-center justify-between'>
				<span className='text-sm text-muted-foreground'>
					Question {currentQuestionIndex + 1} of {totalQuestions}
				</span>
				<Badge variant='outline'>
					{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
				</Badge>
			</div>

			{/* Question */}
			<div className='space-y-4'>
				<h3 className='text-xl font-medium'>{currentQuestion.questionText}</h3>
				<RadioGroup
					value={answers[currentQuestion.id] || ''}
					onValueChange={handleAnswerSelect}
					className='space-y-3'
				>
					{currentQuestion.options.map((option, index) => (
						<div key={index} className='flex items-center space-x-3'>
							<RadioGroupItem value={option} id={`option-${index}`} />
							<Label htmlFor={`option-${index}`} className='cursor-pointer'>
								{option}
							</Label>
						</div>
					))}
				</RadioGroup>
			</div>

			{/* Navigation */}
			<div className='flex justify-between pt-4 border-t border-border/50'>
				<Button
					variant='outline'
					onClick={handlePrevious}
					disabled={currentQuestionIndex === 0}
				>
					Previous
				</Button>
				<Button
					onClick={handleNext}
					disabled={!answers[currentQuestion.id]}
					className={isLastQuestion ? 'bg-purple-600 hover:bg-purple-700' : ''}
				>
					{isLastQuestion ? 'Submit Quiz' : 'Next'}
				</Button>
			</div>
		</div>
	);
}
