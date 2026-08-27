import { CourseDetailPage } from '@/components/course/course-details';
import { featuredCourses } from '@/mocks';
import { notFound } from 'next/navigation';

export default async function CourseDetailPageRoute({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const course = featuredCourses.find((c) => c.slug === slug);

	if (!course) {
		notFound();
	}

	return (
		<CourseDetailPage
			course={course}
			isEnrolled={false}
			completedLessonIds={[]}
			progress={0}
		/>
	);
}
