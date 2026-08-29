import { CourseDetailPage } from '@/components/course/course-details';
import { Course } from '@/types/course.types';

interface StudentCourseViewProps {
	course: Course;
	isEnrolled: boolean;
	completedLessonIds: number[];
}

export function StudentCourseView({
	course,
	isEnrolled,
	completedLessonIds,
}: StudentCourseViewProps) {
	return (
		<CourseDetailPage
			course={course}
			isEnrolled={isEnrolled}
			initialCompletedLessonIds={completedLessonIds}
		/>
	);
}
