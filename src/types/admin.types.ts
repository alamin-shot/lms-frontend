import { User } from './auth.types';

export interface AdminStatsProps {
	users: number;
	courses: number;
	enrollments: number;
	blogPosts: number;
}

export interface AdminUserCardProps {
	user: User;
	onRoleChange?: (userId: number, newRole: string) => void;
}

export interface AdminUserListProps {
	users: User[];
	onRoleChange?: (userId: number, newRole: string) => void;
}

export interface AdminDashboardPageProps {
	users: User[];
	courses: number;
	enrollments: number;
	blogPosts: number;
}