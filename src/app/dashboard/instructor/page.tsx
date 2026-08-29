import { InstructorDashboardPage } from '@/components/dashboard/instructor/overview/instructor-dashboard-page';
import { courseService } from '@/services/course.service';
import { Course } from '@/types/course.types';
import { cookies } from 'next/headers';

export default async function Page() {
	const token = (await cookies()).get('jwt')?.value;
	let courses: Course[] = [];

	try {
		courses = await courseService.getAll(token);
	} catch (error) {
		console.error('Error fetching courses:', error);
	}

	return <InstructorDashboardPage courses={courses} />;
}
