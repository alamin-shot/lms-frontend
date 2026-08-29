'use client';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Plus, Edit, FileQuestion, Trash2 } from 'lucide-react';
import BackButton from '@/components/ui/back-button';
import { useState } from 'react';
import { DeleteConfirmationModal } from '@/components/ui/delete-confirmation-modal';
import { ManageQuizPageProps } from '@/types/instructor.types';
import { quizService } from '@/services/quiz.service';
import { toast } from 'sonner';

export function ManageQuizPage({
	course,
	quiz,
	onDeleteQuiz,
}: ManageQuizPageProps) {
	const hasQuiz = !!quiz;
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteQuiz = async () => {
		if (!quiz) return;
		setIsDeleting(true);
		try {
			await quizService.delete(quiz.id, quiz.documentId);
			toast.success('Quiz deleted successfully!');
			onDeleteQuiz?.();
			window.location.reload();
		} catch (error) {
			console.error('Error deleting quiz:', error);
			toast.error('Failed to delete quiz. Please try again.');
		} finally {
			setIsDeleting(false);
			setShowDeleteModal(false);
		}
	};

	return (
		<>
			<Container className='py-8'>
				<div className='mb-6'>
					<BackButton
						href={`/dashboard/instructor/courses/${course.id}/lessons`}
						label='Back to Lessons'
					/>
				</div>

				<div className='space-y-6'>
					<div className='flex items-center justify-between'>
						<div>
							<h1 className='text-3xl font-bold'>{course.title}</h1>
							<p className='text-muted-foreground mt-1'>
								Manage quiz for this course
							</p>
						</div>
						{hasQuiz ? (
							<div className='flex gap-2'>
								<Link
									href={`/dashboard/instructor/courses/${course.id}/quiz/edit`}
								>
									<Button className='bg-purple-600 hover:bg-purple-700'>
										<Edit className='h-4 w-4 mr-2' /> Edit Quiz
									</Button>
								</Link>
								<Button
									variant='outline'
									className='text-red-500 hover:text-red-600'
									onClick={() => setShowDeleteModal(true)}
									disabled={isDeleting}
								>
									<Trash2 className='h-4 w-4 mr-2' /> Delete
								</Button>
							</div>
						) : (
							<Link
								href={`/dashboard/instructor/courses/${course.id}/quiz/create`}
							>
								<Button className='bg-purple-600 hover:bg-purple-700'>
									<Plus className='h-4 w-4 mr-2' /> Create Quiz
								</Button>
							</Link>
						)}
					</div>

					{hasQuiz ? (
						<Card>
							<CardContent className='p-6 space-y-4'>
								<div className='flex items-center justify-between'>
									<div>
										<h3 className='font-semibold text-lg'>{quiz.title}</h3>
										<p className='text-sm text-muted-foreground'>
											{quiz.questions?.length || 0} questions
										</p>
									</div>
									<Link
										href={`/dashboard/instructor/courses/${course.id}/quiz/questions`}
									>
										<Button variant='outline' className='gap-1'>
											<FileQuestion className='h-4 w-4' /> Manage Questions
										</Button>
									</Link>
								</div>
								<div className='flex flex-wrap gap-2'>
									{quiz.questions?.map((q, index) => (
										<Badge key={index} variant='outline'>
											Q{index + 1}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					) : (
						<div className='text-center py-12 border border-border/50 rounded-xl'>
							<FileQuestion className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
							<p className='text-muted-foreground'>
								No quiz created for this course yet
							</p>
							<Link
								href={`/dashboard/instructor/courses/${course.id}/quiz/create`}
							>
								<Button className='mt-4 bg-purple-600 hover:bg-purple-700'>
									<Plus className='h-4 w-4 mr-2' /> Create Quiz
								</Button>
							</Link>
						</div>
					)}
				</div>
			</Container>

			<DeleteConfirmationModal
				isOpen={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onConfirm={handleDeleteQuiz}
				title='Delete Quiz'
				description={`Are you sure you want to delete "${quiz?.title}"? All questions will also be deleted. This action cannot be undone.`}
				isLoading={isDeleting}
			/>
		</>
	);
}
