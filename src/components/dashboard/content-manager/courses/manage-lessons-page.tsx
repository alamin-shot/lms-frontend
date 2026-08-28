'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import BackButton from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Course } from '@/types/course.types';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { DeleteConfirmationModal } from '@/components/ui/delete-confirmation-modal';

interface ManageLessonsPageProps {
	course: Course;
}

export function ManageLessonsPage({ course }: ManageLessonsPageProps) {
	const lessons = course.lessons || [];
	const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

	const handleDeleteClick = (lessonId: number) => {
		setSelectedLessonId(lessonId);
		setShowDeleteModal(true);
	};

	const handleConfirmDelete = () => {
		if (selectedLessonId) {
			console.log('Delete lesson:', selectedLessonId);
			setShowDeleteModal(false);
			setSelectedLessonId(null);
			// TODO: Implement delete
		}
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
							<p className='text-muted-foreground mt-1'>Manage lessons</p>
						</div>
						<Link
							href={`/dashboard/content-manager/courses/${course.id}/lessons/create`}
						>
							<Button className='bg-purple-600 hover:bg-purple-700'>
								<Plus className='h-4 w-4 mr-2' /> Add Lesson
							</Button>
						</Link>
					</div>

					{sortedLessons.length > 0 ? (
						<div className='space-y-3'>
							{sortedLessons.map((lesson) => (
								<Card key={lesson.id} className='overflow-hidden'>
									<CardContent className='p-4 flex items-center justify-between'>
										<div className='flex items-center gap-4'>
											<GripVertical className='h-4 w-4 text-muted-foreground' />
											<div>
												<div className='flex items-center gap-2'>
													<Badge variant='outline'>#{lesson.order}</Badge>
													<h3 className='font-medium'>{lesson.title}</h3>
												</div>
												<p className='text-sm text-muted-foreground'>
													{lesson.videoUrl ? '📹 Video' : '📝 Text'}
												</p>
											</div>
										</div>
										<div className='flex gap-2'>
											<Link
												href={`/dashboard/content-manager/courses/${course.id}/lessons/${lesson.id}/edit`}
											>
												<Button variant='outline' size='sm'>
													<Edit className='h-3 w-3' />
												</Button>
											</Link>
											<Button
												variant='outline'
												size='sm'
												className='text-red-500 hover:text-red-600'
												onClick={() => handleDeleteClick(lesson.id)}
											>
												<Trash2 className='h-3 w-3' />
											</Button>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					) : (
						<div className='text-center py-12 border border-border/50 rounded-xl'>
							<p className='text-muted-foreground'>No lessons yet</p>
						</div>
					)}
				</div>
			</Container>

			<DeleteConfirmationModal
				isOpen={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onConfirm={handleConfirmDelete}
				title='Delete Lesson'
				description='Are you sure you want to delete this lesson? This action cannot be undone.'
			/>
		</>
	);
}
