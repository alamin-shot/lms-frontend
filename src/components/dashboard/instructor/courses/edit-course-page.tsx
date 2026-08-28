'use client';

import { Container } from '@/components/ui/container';
import { CourseForm } from './course-form';
import { CourseFormData } from '@/lib/validations/course.schema';
import { Course } from '@/types/course.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import BackButton from '@/components/ui/back-button';

interface EditCoursePageProps {
	course: Course;
}

export function EditCoursePage({ course }: EditCoursePageProps) {
	const router = useRouter();

	const defaultValues: CourseFormData = {
		title: course.title,
		description: course.description,
		slug: course.slug,
		coverImage: course.coverImage || '',
	};

	const handleSubmit = (data: CourseFormData) => {
		console.log('Updated course:', data);
		toast.success('Course updated successfully!');
		router.push('/dashboard/instructor');
		// TODO: Save to backend
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
