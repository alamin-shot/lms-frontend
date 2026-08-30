import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, GraduationCap, FileText } from 'lucide-react';
import { AdminStatsProps } from '@/types/admin.types';

export function AdminStats({ users, courses, enrollments, blogPosts }: AdminStatsProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
						<Users className="h-4 w-4" /> Total Users
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">{users}</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
						<BookOpen className="h-4 w-4" /> Total Courses
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">{courses}</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
						<GraduationCap className="h-4 w-4" /> Enrollments
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">{enrollments}</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
						<FileText className="h-4 w-4" /> Blog Posts
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">{blogPosts}</p>
				</CardContent>
			</Card>
		</div>
	);
}