import { ManageLessonsPage } from '@/components/dashboard/instructor/lessons/manage-lessons-page';
import { instructorCourses } from '@/mocks';
import { notFound } from 'next/navigation';

export default async function ManageLessonsPageRoute({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const course = instructorCourses.find((c) => c.id === parseInt(id));

	if (!course) {
		notFound();
	}

	return <ManageLessonsPage course={course} />;
}
