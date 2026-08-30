import { StudentDashboardPage } from './student-dashboard-page';
import { enrollmentService } from '@/services/enrollment.service';
import { progressService } from '@/services/progress.service';
import { DashboardCourse } from '@/types/dashboard.types';
import { Enrollment } from '@/services/enrollment.service';
import { Progress } from '@/services/progress.service';
import { cookies } from 'next/headers';

export async function StudentDashboardContainer({
	token: tokenFromParam,
}: {
	token?: string;
} = {}) {
	let enrollments: Enrollment[] = [];
	let allProgress: Progress[] = [];

	// Use token from param or fallback to cookies
	let token = tokenFromParam;
	if (!token) {
		token = (await cookies()).get('jwt')?.value;
	}

	console.log('🔍 Token received in container:', token);
	console.log('🔍 Token length:', token?.length);

	if (!token) {
		console.log('❌ No token found!');
		return <StudentDashboardPage courses={[]} />;
	}

	try {
		enrollments = await enrollmentService.getUserEnrollments(token);
		console.log('✅ Enrollments fetched:', enrollments.length);
	} catch (error) {
		console.log('Error fetching enrollments:', error);
		return <StudentDashboardPage courses={[]} />;
	}

	try {
		allProgress = await progressService.getAllProgress(token);
	} catch (error) {
		console.log(
			'Progress unavailable; showing courses without progress:',
			error,
		);
	}

	// Process enrolled courses with progress
	const uniqueEnrollments = Array.from(
		new Map(
			enrollments.map((enrollment) => [enrollment.course.id, enrollment]),
		).values(),
	);
	const coursesWithProgress: DashboardCourse[] = uniqueEnrollments.map(
		(enrollment) => {
			const course = enrollment.course;
			const completedLessons = allProgress
				.filter((p) => p.completed && p.lesson?.course?.id === course.id)
				.map((p) => p.lesson?.id)
				.filter((id): id is number => id !== undefined);

			const totalLessons = course.lessons?.length || 0;
			const progress =
				totalLessons > 0
					? Math.round((completedLessons.length / totalLessons) * 100)
					: 0;

			return {
				...course,
				progress,
				completedCount: completedLessons.length,
				totalCount: totalLessons,
			};
		},
	);

	console.log('✅ Courses with progress:', coursesWithProgress.length);

	return <StudentDashboardPage courses={coursesWithProgress} />;
}
