import { AdminDashboardPage } from '@/components/dashboard/admin/overview/admin-dashboard-page';
import { userService } from '@/services/user.service';
import { courseService } from '@/services/course.service';
import { blogService } from '@/services/blog.service';
import { enrollmentService } from '@/services/enrollment.service';
import { cookies } from 'next/headers';
import { User } from '@/types';

export default async function Page() {
	const token = (await cookies()).get('jwt')?.value;

	let users: User[] = [];
	let courses = 0;
	let enrollments = 0;
	let blogPosts = 0;

	try {
		const fetchedUsers = await userService.getAdminUsers(token);
		users = Array.isArray(fetchedUsers) ? fetchedUsers : [];
		console.log('🔍 Users from API:', users);
		console.log('🔍 Users length:', users.length);
	} catch (error) {
		console.error('Error fetching users:', error);
		users = [];
	}

	try {
		const allCourses = await courseService.getAll(token);
		courses = Array.isArray(allCourses) ? allCourses.length : 0;
	} catch (error) {
		console.error('Error fetching courses:', error);
	}

	try {
		const allEnrollments = await enrollmentService.getAdminEnrollments(token);
		enrollments = Array.isArray(allEnrollments) ? allEnrollments.length : 0;
	} catch (error) {
		console.error('Error fetching enrollments:', error);
	}

	try {
		const allPosts = await blogService.getAll(token);
		blogPosts = Array.isArray(allPosts) ? allPosts.length : 0;
	} catch (error) {
		console.error('Error fetching blog posts:', error);
	}

	return (
		<AdminDashboardPage
			users={users}
			courses={courses}
			enrollments={enrollments}
			blogPosts={blogPosts}
		/>
	);
}