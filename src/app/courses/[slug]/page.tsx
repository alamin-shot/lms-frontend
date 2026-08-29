import { CourseDetailPage } from '@/components/course/course-details';
import { courseService } from '@/services/course.service';
import { enrollmentService } from '@/services/enrollment.service';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function CoursePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const token = (await cookies()).get('jwt')?.value;

	let course;
	try {
		course = await courseService.getBySlug(slug, token);
	} catch {
		notFound();
	}

	if (!course) notFound();

	const isEnrolled = token
		? await enrollmentService.isEnrolled(course.id, token)
		: false;

	return <CourseDetailPage course={course} isEnrolled={isEnrolled} />;
}
