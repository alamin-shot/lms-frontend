import { ContentManagerDashboardPage } from '@/components/dashboard/content-manager/overview/content-manager-dashboard-page';
import { courseService } from '@/services/course.service';
import { blogService } from '@/services/blog.service';
import { cookies } from 'next/headers';
import { Course } from '@/types/course.types';
import { BlogPost } from '@/types/blog.types';

export default async function Page() {
	const token = (await cookies()).get('jwt')?.value;
	let courses: Course[] = [];
	let blogPosts: BlogPost[] = [];

	try {
		courses = await courseService.getAll(token);
	} catch (error) {
		console.error('Error fetching courses:', error);
	}

	try {
		blogPosts = await blogService.getAll();
	} catch (error) {
		console.error('Error fetching blog posts:', error);
	}

	return <ContentManagerDashboardPage courses={courses} blogPosts={blogPosts} />;
}