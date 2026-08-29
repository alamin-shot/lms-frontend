import { StudentCourseView } from '@/components/dashboard/student/student-course-view';
import { courseService } from '@/services/course.service';
import { enrollmentService } from '@/services/enrollment.service';
import { progressService } from '@/services/progress.service';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function StudentCoursePage({
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

	if (!course) {
		notFound();
	}

	const isEnrolled = await enrollmentService.isEnrolled(course.id, token);

	let completedLessonIds: number[] = [];
	if (isEnrolled) {
		try {
			const progressData = await progressService.getCourseProgress(
				course.id,
				token,
			);
			completedLessonIds = progressData.progress
				.filter((p) => p.completed)
				.map((p) => p.lesson.id);
		} catch (error) {
			console.log('Error fetching progress data:', error);
		}
	}

	return (
		<StudentCourseView
			course={course}
			isEnrolled={isEnrolled}
			completedLessonIds={completedLessonIds}
		/>
	);
}
