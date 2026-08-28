'use client';

import { CMCourseCard } from './cm-course-card';
import { CMCourseListProps } from '@/types/content-manager.types';

export function CMCourseList({ courses, onDelete }: CMCourseListProps) {
	if (courses.length === 0) {
		return (
			<div className='text-center py-12 border border-border/50 rounded-xl'>
				<p className='text-muted-foreground'>No courses found</p>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
			{courses.map((course) => (
				<CMCourseCard key={course.id} course={course} onDelete={onDelete} />
			))}
		</div>
	);
}
