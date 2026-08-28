import { CMAddLessonPage } from '@/components/dashboard/content-manager/lessons/add-lesson-page';
import { instructorCourses } from '@/mocks';
import { notFound } from 'next/navigation';

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const course = instructorCourses.find((c) => c.id === parseInt(id));

	if (!course) {
		notFound();
	}

	return <CMAddLessonPage course={course} />;
}
