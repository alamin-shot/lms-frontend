'use client';

import { Container } from '@/components/ui/container';
import { CourseForm } from './course-form';
import { CourseFormData } from '@/lib/validations/course.schema';
import { EditCoursePageProps } from '@/types/instructor.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import BackButton from '@/components/ui/back-button';
import { courseService } from '@/services/course.service';

export function EditCoursePage({ course }: EditCoursePageProps) {
	const router = useRouter();

	const defaultValues: CourseFormData = {
		title: course.title,
		description: course.description,
		slug: course.slug,
		coverImage: course.coverImage || '',
	};

	const handleSubmit = async (data: CourseFormData) => {
		try {
			await courseService.update(course.id, data, course.documentId);
			toast.success('Course updated successfully!');
			router.push('/dashboard/instructor');
		} catch (error) {
			console.error('Error updating course:', error);
			toast.error('Failed to update course. Please try again.');
		}
	};

	return (
		<Container className='py-8 max-w-2xl'>
			<div className='mb-6'>
				<BackButton href='/dashboard/instructor' label='Back to Dashboard' />
			</div>

			<div className='space-y-6'>
				<div>
					<h1 className='text-3xl font-bold'>Edit Course</h1>
					<p className='text-muted-foreground mt-1'>
						Update your course details
					</p>
				</div>

				<div className='p-6 rounded-xl border border-border/50 bg-card/30'>
					<CourseForm defaultValues={defaultValues} onSubmit={handleSubmit} />
				</div>
			</div>
		</Container>
	);
}
