'use client';

import { InstructorCourseListProps } from '@/types/instructor.types';
import { InstructorCourseCard } from './instructor-course-card';
import { BookOpen } from 'lucide-react';

export function InstructorCourseList({
	courses,
	onDelete,
}: InstructorCourseListProps) {
	if (courses.length === 0) {
		return (
			<div className='text-center py-12'>
				<BookOpen className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
				<h3 className='text-lg font-semibold'>No courses yet</h3>
				<p className='text-muted-foreground'>
					Create your first course to get started
				</p>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
			{courses.map((course) => (
				<InstructorCourseCard
					key={course.id}
					course={course}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
}
