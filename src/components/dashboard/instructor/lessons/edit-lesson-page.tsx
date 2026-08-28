'use client';

import { Container } from '@/components/ui/container';
import { LessonForm } from './lesson-form';
import { LessonFormData } from '@/lib/validations/lesson.schema';
import { Course, Lesson } from '@/types/course.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import BackButton from '@/components/ui/back-button';

interface EditLessonPageProps {
	course: Course;
	lesson: Lesson;
}

export function EditLessonPage({ course, lesson }: EditLessonPageProps) {
	const router = useRouter();

	const defaultValues: LessonFormData = {
		title: lesson.title,
		content: lesson.content,
		videoUrl: lesson.videoUrl || '',
		order: lesson.order,
	};

	const handleSubmit = (data: LessonFormData) => {
		console.log('Updated lesson:', data);
		toast.success('Lesson updated successfully!');
		router.push(`/dashboard/instructor/courses/${course.id}/lessons`);
		// TODO: Save to backend
	};

	return (
		<Container className='py-8 max-w-2xl'>
			<div className='mb-6'>
				<BackButton
					href={`/dashboard/instructor/courses/${course.id}/lessons`}
					label='Back to Lessons'
				/>
			</div>

			<div className='space-y-6'>
				<div>
					<h1 className='text-3xl font-bold'>Edit Lesson</h1>
					<p className='text-muted-foreground mt-1'>Update lesson details</p>
				</div>

				<div className='p-6 rounded-xl border border-border/50 bg-card/30'>
					<LessonForm defaultValues={defaultValues} onSubmit={handleSubmit} />
				</div>
			</div>
		</Container>
	);
}
