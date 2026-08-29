'use client';

import { Container } from '@/components/ui/container';
import { CourseForm } from './course-form';
import { CourseFormData } from '@/lib/validations/course.schema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import BackButton from '@/components/ui/back-button';
import { courseService } from '@/services/course.service';

export function CreateCoursePage() {
	const router = useRouter();

	const handleSubmit = async (data: CourseFormData) => {
		try {
			await courseService.create(data);
			toast.success('Course created successfully!');
			router.push('/dashboard/instructor');
		} catch (error) {
			console.error('Error creating course:', error);
			toast.error('Failed to create course. Please try again.');
		}
	};

	return (
		<Container className='py-8 max-w-2xl'>
			<div className='mb-6'>
				<BackButton href='/dashboard/instructor' label='Back to Dashboard' />
			</div>

			<div className='space-y-6'>
				<div>
					<h1 className='text-3xl font-bold'>Create New Course</h1>
					<p className='text-muted-foreground mt-1'>
						Fill in the details below to create your course
					</p>
				</div>

				<div className='p-6 rounded-xl border border-border/50 bg-card/30'>
					<CourseForm onSubmit={handleSubmit} />
				</div>
			</div>
		</Container>
	);
}
