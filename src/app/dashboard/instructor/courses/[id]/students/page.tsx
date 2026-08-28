import { StudentProgressPage } from '@/components/dashboard/instructor/courses/student-progress-page';
import { instructorCourses } from '@/mocks';
import { notFound } from 'next/navigation';

export default async function StudentProgressPageRoute({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const course = instructorCourses.find((c) => c.id === parseInt(id));

	if (!course) {
		notFound();
	}

	return <StudentProgressPage course={course} />;
}
