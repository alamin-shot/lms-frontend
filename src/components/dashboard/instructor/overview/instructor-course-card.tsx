'use client';

import { useState } from 'react';
import { InstructorCourseCardProps } from '@/types/instructor.types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, Edit, FileQuestion, Trash2, Users } from 'lucide-react';
import Image from 'next/image';
import { DeleteConfirmationModal } from '@/components/ui/delete-confirmation-modal';
import { courseService } from '@/services/course.service';
import { toast } from 'sonner';

export function InstructorCourseCard({
	course,
	onDelete,
}: InstructorCourseCardProps) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleDelete = async () => {
		try {
			await courseService.delete(course.id, course.documentId);
			toast.success('Course deleted successfully!');
			onDelete?.(course.id);
			window.location.reload();
		} catch (error) {
			console.error('Error deleting course:', error);
			toast.error('Failed to delete course. Please try again.');
		} finally {
			setShowDeleteModal(false);
		}
	};

	return (
		<>
			<Card className='overflow-hidden'>
				<div className='aspect-video overflow-hidden bg-muted'>
					{course.coverImage ? (
						<Image
							src={course.coverImage}
							alt={course.title}
							className='w-full h-full object-cover'
							width={400}
							height={225}
						/>
					) : (
						<div className='w-full h-full flex items-center justify-center text-muted-foreground'>
							<BookOpen className='h-8 w-8' />
						</div>
					)}
				</div>
				<CardContent className='p-4'>
					<h3 className='font-semibold line-clamp-1'>{course.title}</h3>
					<p className='text-sm text-muted-foreground mt-1 line-clamp-2'>
						{course.description}
					</p>
					<p className='text-xs text-muted-foreground mt-2'>
						{course.lessons?.length || 0} lessons
					</p>
					<div className='flex flex-wrap gap-2 mt-4'>
						<Link href={`/dashboard/instructor/courses/${course.id}/edit`}>
							<Button variant='outline' size='sm' className='gap-1'>
								<Edit className='h-3 w-3' /> Edit
							</Button>
						</Link>
						<Link href={`/dashboard/instructor/courses/${course.id}/lessons`}>
							<Button variant='outline' size='sm' className='gap-1'>
								<BookOpen className='h-3 w-3' /> Lessons
							</Button>
						</Link>
						<Link href={`/dashboard/instructor/courses/${course.id}/quiz`}>
							<Button variant='outline' size='sm' className='gap-1'>
								<FileQuestion className='h-3 w-3' /> Quiz
							</Button>
						</Link>
						<Link href={`/dashboard/instructor/courses/${course.id}/students`}>
							<Button variant='outline' size='sm' className='gap-1'>
								<Users className='h-3 w-3' /> Students
							</Button>
						</Link>
						<Button
							variant='outline'
							size='sm'
							className='gap-1 text-red-500 hover:text-red-600 hover:bg-red-500/10'
							onClick={() => setShowDeleteModal(true)}
						>
							<Trash2 className='h-3 w-3' />
						</Button>
					</div>
				</CardContent>
			</Card>

			<DeleteConfirmationModal
				isOpen={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onConfirm={handleDelete}
				title='Delete Course'
				description={`Are you sure you want to delete "${course.title}"? This action cannot be undone.`}
			/>
		</>
	);
}
