'use client';

import { Container } from '@/components/ui/container';
import BackButton from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

import { Plus, Edit, Trash2, FileQuestion } from 'lucide-react';
import { useState } from 'react';
import { DeleteConfirmationModal } from '@/components/ui/delete-confirmation-modal';
import { CMManageQuizPageProps } from '@/types/content-manager.types';

export function CMManageQuizPage({ course, quiz }: CMManageQuizPageProps) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const hasQuiz = !!quiz;

	const handleDeleteQuiz = () => {
		console.log('Delete quiz');
		setShowDeleteModal(false);
		// TODO: Implement delete
	};

	return (
		<>
			<Container className='py-8'>
				<div className='mb-6'>
					<BackButton
						href='/dashboard/content-manager'
						label='Back to Dashboard'
					/>
				</div>

				<div className='space-y-6'>
					<div className='flex items-center justify-between'>
						<div>
							<h1 className='text-3xl font-bold'>{course.title}</h1>
							<p className='text-muted-foreground mt-1'>Manage quiz</p>
						</div>
						{!hasQuiz ? (
							<Link
								href={`/dashboard/content-manager/courses/${course.id}/quiz/create`}
							>
								<Button className='bg-purple-600 hover:bg-purple-700'>
									<Plus className='h-4 w-4 mr-2' /> Create Quiz
								</Button>
							</Link>
						) : (
							<div className='flex gap-2'>
								<Link
									href={`/dashboard/content-manager/courses/${course.id}/quiz/edit`}
								>
									<Button variant='outline' className='gap-1'>
										<Edit className='h-4 w-4' /> Edit Quiz
									</Button>
								</Link>
								<Button
									variant='outline'
									className='gap-1 text-red-500 hover:text-red-600'
									onClick={() => setShowDeleteModal(true)}
								>
									<Trash2 className='h-4 w-4' /> Delete Quiz
								</Button>
							</div>
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
										href={`/dashboard/content-manager/courses/${course.id}/quiz/questions`}
									>
										<Button variant='outline' className='gap-1'>
											<FileQuestion className='h-4 w-4' /> Manage Questions
										</Button>
									</Link>
								</div>
							</CardContent>
						</Card>
					) : (
						<div className='text-center py-12 border border-border/50 rounded-xl'>
							<p className='text-muted-foreground'>No quiz created yet</p>
						</div>
					)}
				</div>
			</Container>

			<DeleteConfirmationModal
				isOpen={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onConfirm={handleDeleteQuiz}
				title='Delete Quiz'
				description={`Are you sure you want to delete "${quiz?.title}"? This action cannot be undone.`}
			/>
		</>
	);
}
