'use client';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Course } from '@/types/course.types';
import { Quiz } from '@/types/quiz.types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import BackButton from '@/components/ui/back-button';
import { useState } from 'react';
import { DeleteConfirmationModal } from '@/components/ui/delete-confirmation-modal';

interface ManageQuestionsPageProps {
	course: Course;
	quiz: Quiz;
	onDeleteQuestion?: (questionId: number) => void;
}

export function ManageQuestionsPage({
	course,
	quiz,
	onDeleteQuestion,
}: ManageQuestionsPageProps) {
	const questions = quiz.questions || [];
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
		null,
	);

	const handleDeleteClick = (questionId: number) => {
		setSelectedQuestionId(questionId);
		setShowDeleteModal(true);
	};

	const handleConfirmDelete = () => {
		if (selectedQuestionId) {
			onDeleteQuestion?.(selectedQuestionId);
			setShowDeleteModal(false);
			setSelectedQuestionId(null);
		}
	};

	return (
		<>
			<Container className='py-8'>
				<div className='mb-6'>
					<BackButton
						href={`/dashboard/instructor/courses/${course.id}/quiz`}
						label='Back to Quiz'
					/>
				</div>

				<div className='space-y-6'>
					<div className='flex items-center justify-between'>
						<div>
							<h1 className='text-3xl font-bold'>{quiz.title}</h1>
							<p className='text-muted-foreground mt-1'>
								Manage questions for this quiz
							</p>
						</div>
						<Link
							href={`/dashboard/instructor/courses/${course.id}/quiz/questions/create`}
						>
							<Button className='bg-purple-600 hover:bg-purple-700'>
								<Plus className='h-4 w-4 mr-2' /> Add Question
							</Button>
						</Link>
					</div>

					{questions.length > 0 ? (
						<div className='space-y-3'>
							{questions.map((question, index) => (
								<Card key={question.id} className='overflow-hidden'>
									<CardContent className='p-4'>
										<div className='flex items-start justify-between'>
											<div className='space-y-2'>
												<div className='flex items-center gap-2'>
													<Badge variant='outline'>Q{index + 1}</Badge>
													<h3 className='font-medium'>
														{question.questionText}
													</h3>
												</div>
												<div className='flex flex-wrap gap-2'>
													{question.options.map((option, optIndex) => (
														<Badge
															key={optIndex}
															variant={
																option === question.correctAnswer
																	? 'default'
																	: 'outline'
															}
															className={
																option === question.correctAnswer
																	? 'bg-green-500/20 text-green-500 border-green-500/30'
																	: ''
															}
														>
															{option}
															{option === question.correctAnswer && ' ✅'}
														</Badge>
													))}
												</div>
											</div>
											<div className='flex gap-2'>
												<Link
													href={`/dashboard/instructor/courses/${course.id}/quiz/questions/${question.id}/edit`}
												>
													<Button variant='outline' size='sm'>
														<Edit className='h-3 w-3' />
													</Button>
												</Link>
												<Button
													variant='outline'
													size='sm'
													className='text-red-500 hover:text-red-600'
													onClick={() => handleDeleteClick(question.id)}
												>
													<Trash2 className='h-3 w-3' />
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					) : (
						<div className='text-center py-12 border border-border/50 rounded-xl'>
							<p className='text-muted-foreground'>No questions yet</p>
							<Link
								href={`/dashboard/instructor/courses/${course.id}/quiz/questions/create`}
							>
								<Button className='mt-4 bg-purple-600 hover:bg-purple-700'>
									<Plus className='h-4 w-4 mr-2' /> Add First Question
								</Button>
							</Link>
						</div>
					)}
				</div>
			</Container>

			<DeleteConfirmationModal
				isOpen={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onConfirm={handleConfirmDelete}
				title='Delete Question'
				description='Are you sure you want to delete this question? This action cannot be undone.'
			/>
		</>
	);
}
