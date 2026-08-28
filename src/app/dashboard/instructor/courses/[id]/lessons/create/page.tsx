import { AddLessonPage } from '@/components/dashboard/instructor/lessons/add-lesson-page';
import { instructorCourses } from '@/mocks';
import { notFound } from 'next/navigation';

export default async function AddLessonPageRoute({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const course = instructorCourses.find((c) => c.id === parseInt(id));

	if (!course) {
		notFound();
	}

	return <AddLessonPage course={course} />;
}
