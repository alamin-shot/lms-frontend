import { EditCoursePage } from '@/components/dashboard/content-manager/courses/edit-course-page';
import { instructorCourses } from '@/mocks';
import { notFound } from 'next/navigation';

export default async function EditCoursePageRoute({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const course = instructorCourses.find((c) => c.id === parseInt(id));

	if (!course) {
		notFound();
	}

	return <EditCoursePage course={course} />;
}
