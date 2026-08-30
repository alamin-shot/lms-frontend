import { CMAddLessonPage } from '@/components/dashboard/content-manager/lessons/add-lesson-page';
import { courseService } from '@/services/course.service';
import { Course } from '@/types/course.types';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const token = (await cookies()).get('jwt')?.value;

	let course: Course | null = null;
	try {
		const courses = await courseService.getAll(token);
		course = courses.find((c) => c.id === parseInt(id, 10)) || null;
	} catch {
		notFound();
	}

	if (!course) {
		notFound();
	}

	return <CMAddLessonPage course={course} />;
}
