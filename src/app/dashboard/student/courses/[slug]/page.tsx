import { CourseDetailPage } from '@/components/course/course-details';
import { enrolledCourses } from '@/mocks';
import { notFound } from 'next/navigation';

export default async function StudentCoursePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const course = enrolledCourses.find((c) => c.slug === slug);
	if (!course) notFound();

	// Mock completed lessons - will come from progress system later
	const completedLessonIds = [1, 2];

	return (
		<CourseDetailPage
			course={course}
			isEnrolled={true}
			initialCompletedLessonIds={completedLessonIds}
		/>
	);
}
