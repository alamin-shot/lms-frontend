'use client';

import { Container } from '@/components/ui/container';
import { mockUsers } from '@/mocks/users';
import { instructorCourses } from '@/mocks';
import { blogPosts } from '@/mocks/blog-posts';
import { AdminStats } from './admin-stats';
import { AdminUserList } from '../users/admin-user-list';
import { toast } from 'sonner';

export function AdminDashboardPage() {
	const users = mockUsers;
	const courses = instructorCourses;
	const posts = blogPosts;
	const totalEnrollments = 0;

	const handleRoleChange = (userId: number, newRole: string) => {
		console.log(`User ${userId} role changed to ${newRole}`);
		toast.success(`User role updated to ${newRole}`);
		// TODO: Save to backend
	};

	return (
		<Container className='py-8'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold'>Admin Dashboard</h1>
				<p className='text-muted-foreground mt-1'>
					Full platform control and analytics
				</p>
			</div>

			<AdminStats
				users={users.length}
				courses={courses.length}
				enrollments={totalEnrollments}
				blogPosts={posts.length}
			/>

			<div className='mt-8'>
				<h2 className='text-2xl font-bold mb-4'>User Management</h2>
				<AdminUserList users={users} onRoleChange={handleRoleChange} />
			</div>
		</Container>
	);
}
