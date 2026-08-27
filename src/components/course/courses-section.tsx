import { Container } from '@/components/ui/container';
import { CourseGrid } from './course-grid';
import { CourseSearch } from './course-search';
import { Course } from '@/types/course.types';

interface CoursesSectionProps {
	courses: Course[];
	title?: string;
	description?: string;
}

export function CoursesSection({
	courses,
	title = 'All Courses',
	description = 'Discover courses from our expert instructors',
}: CoursesSectionProps) {
	return (
		<main className='min-h-screen py-12'>
			<Container>
				{/* Header */}
				<div className='mb-10'>
					<h1 className='text-4xl font-bold'>{title}</h1>
					<p className='text-muted-foreground mt-2'>{description}</p>
				</div>

				{/* Search */}
				<div className='mb-10'>
					<CourseSearch />
				</div>

				{/* Course Grid */}
				{courses.length > 0 ? (
					<CourseGrid courses={courses} columns={4} />
				) : (
					<div className='text-center py-16'>
						<h3 className='text-lg font-semibold'>No courses found</h3>
						<p className='text-muted-foreground'>Try adjusting your search</p>
					</div>
				)}
			</Container>
		</main>
	);
}
