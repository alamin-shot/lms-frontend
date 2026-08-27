import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { CourseGrid } from '@/components/course';
import { Course } from '@/types/course.types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FeaturedCoursesSectionProps {
	courses: Course[];
}

export function FeaturedCoursesSection({
	courses,
}: FeaturedCoursesSectionProps) {
	return (
		<section className='py-16'>
			<Container>
				<div className='flex items-center justify-between mb-10'>
					<div>
						<h2 className='text-3xl font-bold'>Featured Courses</h2>
						<p className='text-muted-foreground mt-2'>
							Most popular courses from our top instructors
						</p>
					</div>
					<Link href='/courses'>
						<Button className='gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all p-6 text-md'>
							View All Courses <ArrowRight className='h-4 w-4' />
						</Button>
					</Link>
				</div>

				<CourseGrid courses={courses} columns={4} />
			</Container>
		</section>
	);
}
