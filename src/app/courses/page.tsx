import { CoursesSection } from '@/components/course';
import { courseService } from '@/services/course.service';

export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
	const courses = await courseService.getAll();
	console.log('Courses from API:', courses);
	return <CoursesSection courses={courses} />;
}
