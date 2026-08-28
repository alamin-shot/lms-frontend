import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {  CMStatsProps } from '@/types';
import { BookOpen, FileText, Users, FileCheck } from 'lucide-react';



export function CMStats({ courses, blogPosts }: CMStatsProps) {
	const publishedPosts = blogPosts.filter((p) => p.publishedAt !== null);
	const draftPosts = blogPosts.filter((p) => p.publishedAt === null);

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='text-sm font-medium text-muted-foreground flex items-center gap-2'>
						<BookOpen className='h-4 w-4' /> Total Courses
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-2xl font-bold'>{courses.length}</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='text-sm font-medium text-muted-foreground flex items-center gap-2'>
						<FileText className='h-4 w-4' /> Total Posts
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-2xl font-bold'>{blogPosts.length}</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='text-sm font-medium text-muted-foreground flex items-center gap-2'>
						<FileCheck className='h-4 w-4' /> Published
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-2xl font-bold'>{publishedPosts.length}</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='text-sm font-medium text-muted-foreground flex items-center gap-2'>
						<Users className='h-4 w-4' /> Drafts
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-2xl font-bold'>{draftPosts.length}</p>
				</CardContent>
			</Card>
		</div>
	);
}
