import { EditCoursePage } from '@/components/dashboard/instructor/courses/edit-course-page';
import { courseService } from '@/services/course.service';
import { Course } from '@/types/course.types';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function EditCoursePageRoute({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
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

	return <EditCoursePage course={course} />;
}
