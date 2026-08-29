import { InstructorDashboardPage } from '@/components/dashboard/instructor/overview/instructor-dashboard-page';
import { courseService } from '@/services/course.service';
import { enrollmentService } from '@/services/enrollment.service';
import { Course } from '@/types/course.types';
import { cookies } from 'next/headers';

export default async function Page() {
	const token = (await cookies()).get('jwt')?.value;
	let courses: Course[] = [];
	let totalStudents = 0;

	try {
		const [fetchedCourses, fetchedEnrollments] = await Promise.all([
			courseService.getAll(token),
			enrollmentService.getUserEnrollments(token).catch(() => []),
		]);

		courses = fetchedCourses;

		const courseIds = new Set(courses.map((c) => c.id));
		const relevantEnrollments = fetchedEnrollments.filter(
			(e) => e.course && courseIds.has(e.course.id) && e.user,
		);

		// Calculate unique students across all courses
		const uniqueUserIds = new Set(
			relevantEnrollments.map((e) => e.user.id),
		);
		totalStudents = uniqueUserIds.size;
	} catch (error) {
		console.error('Error fetching dashboard data:', error);
	}

	return (
		<InstructorDashboardPage
			courses={courses}
			totalStudents={totalStudents}
		/>
	);
}
