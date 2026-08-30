'use client';

import { Container } from '@/components/ui/container';
import { AdminStats } from './admin-stats';
import { AdminUserList } from '../users/admin-user-list';
import { AdminDashboardPageProps } from '@/types/admin.types';
import { toast } from 'sonner';
import { userService } from '@/services/user.service';
import { useRouter } from 'next/navigation';

export function AdminDashboardPage({
	users = [],
	courses = 0,
	enrollments = 0,
	blogPosts = 0,
}: AdminDashboardPageProps) {
	const router = useRouter();

	const handleRoleChange = async (userId: number, newRole: string) => {
		try {
			const roleMap: Record<string, number> = {
				Student: 4,
				Instructor: 3,
				'Content Manager': 2,
				Admin: 1,
			};
			const roleId = roleMap[newRole];
			if (!roleId) {
				toast.error('Invalid role');
				return;
			}
			await userService.updateRole(userId, roleId);
			toast.success(`User role updated to ${newRole}`);
			router.refresh();
		} catch (error) {
			console.error('Error updating role:', error);
			toast.error('Failed to update user role.');
		}
	};

	return (
		<Container className="py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold">Admin Dashboard</h1>
				<p className="text-muted-foreground mt-1">
					Full platform control and analytics
				</p>
			</div>

			<AdminStats
				users={users.length}
				courses={courses}
				enrollments={enrollments}
				blogPosts={blogPosts}
			/>

			<div className="mt-8">
				<h2 className="text-2xl font-bold mb-4">User Management</h2>
				<AdminUserList users={users} onRoleChange={handleRoleChange} />
			</div>
		</Container>
	);
}