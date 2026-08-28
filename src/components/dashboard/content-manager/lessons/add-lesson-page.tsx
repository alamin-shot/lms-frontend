'use client';

import { Container } from '@/components/ui/container';
import  BackButton  from '@/components/ui/back-button';
import { LessonForm } from '@/components/dashboard/instructor/lessons/lesson-form';
import { LessonFormData } from '@/lib/validations/lesson.schema';
import { CMAddLessonPageProps } from '@/types/content-manager.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function CMAddLessonPage({ course }: CMAddLessonPageProps) {
	const router = useRouter();

	const handleSubmit = (data: LessonFormData) => {
		console.log('New lesson:', data);
		toast.success('Lesson added successfully!');
		router.push(`/dashboard/content-manager/courses/${course.id}/lessons`);
		// TODO: Save to backend
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
					<h1 className='text-3xl font-bold'>Add Lesson</h1>
					<p className='text-muted-foreground mt-1'>
						Create a new lesson for {course.title}
					</p>
				</div>

				<div className='p-6 rounded-xl border border-border/50 bg-card/30'>
					<LessonForm onSubmit={handleSubmit} />
				</div>
			</div>
		</Container>
	);
}
