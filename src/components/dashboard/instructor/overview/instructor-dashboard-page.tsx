'use client';

import { Container } from '@/components/ui/container';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { InstructorStats } from './instructor-stats';
import { InstructorCourseList } from './instructor-course-list';
import { InstructorDashboardPageProps } from '@/types/instructor.types';

export function InstructorDashboardPage({
	courses,
	totalStudents = 0,
}: InstructorDashboardPageProps) {
	const handleDelete = (courseId: number) => {
		console.log('Delete course:', courseId);
		// TODO: Implement delete with API
	};

	return (
		<Container className='py-8'>
			{/* Header */}
			<div className='flex items-center justify-between mb-8'>
				<div>
					<h1 className='text-3xl font-bold'>Instructor Dashboard</h1>
					<p className='text-muted-foreground mt-1'>
						Manage your courses and students
					</p>
				</div>
				<Link href='/dashboard/instructor/courses/create'>
					<Button className='bg-purple-600 hover:bg-purple-700'>
						<Plus className='h-4 w-4 mr-2' /> New Course
					</Button>
				</Link>
			</div>

			{/* Stats */}
			<InstructorStats courses={courses} totalStudents={totalStudents} />

			{/* Course List */}
			<InstructorCourseList courses={courses} onDelete={handleDelete} />
		</Container>
	);
}
