import { EditLessonPage } from '@/components/dashboard/instructor/lessons/edit-lesson-page';
import { instructorCourses } from '@/mocks';
import { notFound } from 'next/navigation';

export default async function EditLessonPageRoute({
	params,
}: {
	params: Promise<{ id: string; lessonId: string }>;
}) {
	const { id, lessonId } = await params;
	const course = instructorCourses.find((c) => c.id === parseInt(id));

	if (!course) {
		notFound();
	}

	const lesson = course.lessons?.find((l) => l.id === parseInt(lessonId));
	if (!lesson) {
		notFound();
	}

	return <EditLessonPage course={course} lesson={lesson} />;
}
