import { CoursesSection } from '@/components/course';
import { featuredCourses } from '@/mocks';

export default function CoursesPage() {
	return <CoursesSection courses={featuredCourses} />;
}
