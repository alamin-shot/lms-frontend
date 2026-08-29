import { Course } from '@/types/course.types';
import { CourseCard } from './course-card';

interface CourseGridProps {
	courses: Pick<
		Course,
		'id' | 'title' | 'description' | 'coverImage' | 'slug' | 'instructor'
	>[];
	columns?: 1 | 2 | 3 | 4;
}

export function CourseGrid({ courses, columns = 4 }: CourseGridProps) {
	const gridClasses = {
		1: 'grid-cols-1',
		2: 'grid-cols-1 sm:grid-cols-2',
		3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
		4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
	};

	return (
		<div className={`grid ${gridClasses[columns]} gap-6`}>
			{courses.map((course) => (
				<CourseCard key={course.id} course={course} />
			))}
		</div>
	);
}
