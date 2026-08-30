'use client';

import { Container } from '@/components/ui/container';
import { LessonForm } from '@/components/dashboard/instructor/lessons/lesson-form';
import { LessonFormData } from '@/lib/validations/lesson.schema';
import { CMEditLessonPageProps } from '@/types/content-manager.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import BackButton from '@/components/ui/back-button';
import { lessonService } from '@/services/lesson.service';

export function CMEditLessonPage({ course, lesson }: CMEditLessonPageProps) {
	const router = useRouter();

	const defaultValues: LessonFormData = {
		title: lesson.title,
		content: lesson.content,
		videoUrl: lesson.videoUrl || '',
		order: lesson.order,
	};

	const handleSubmit = async (data: LessonFormData) => {
		try {
			await lessonService.update(lesson.id, data);
			toast.success('Lesson updated successfully!');
			router.push(`/dashboard/content-manager/courses/${course.id}/lessons`);
		} catch (error) {
			console.error('Error updating lesson:', error);
			toast.error('Failed to update lesson.');
		}
	};

	return (
		<Container className='py-8 max-w-2xl'>
			<div className='mb-6'>
				<BackButton
					href={`/dashboard/content-manager/courses/${course.id}/lessons`}
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