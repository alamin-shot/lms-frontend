import { EditLessonPage } from '@/components/dashboard/instructor/lessons/edit-lesson-page';
import { courseService } from '@/services/course.service';
import { lessonService } from '@/services/lesson.service';
import { Course } from '@/types/course.types';
import { Lesson } from '@/types/course.types';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function EditLessonPageRoute({
	params,
}: {
	params: Promise<{ id: string; lessonId: string }>;
}) {
	const { id, lessonId } = await params;
	const token = (await cookies()).get('jwt')?.value;

	let course: Course | null = null;
	try {
		course = await courseService.getById(parseInt(id, 10), token);
	} catch {
		notFound();
	}

	if (!course) {
		notFound();
	}

	let lesson: Lesson | null = null;
	try {
		lesson = await lessonService.getById(parseInt(lessonId, 10), token);
	} catch {
		notFound();
	}

	if (!lesson) {
		notFound();
	}

	return <EditLessonPage course={course} lesson={lesson} />;
}
