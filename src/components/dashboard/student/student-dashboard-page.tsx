import { Container } from '@/components/ui/container';
import { enrolledCourses } from '@/mocks';
import { EnrolledCourseCard } from './enrolled-course-card';
import Link from 'next/link';

export function StudentDashboardPage() {
	return (
		<Container className='py-8'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold'>My Learning</h1>
				<p className='text-muted-foreground mt-1'>
					Continue your learning journey
				</p>
			</div>

			{enrolledCourses.length > 0 ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{enrolledCourses.map((course) => (
						<EnrolledCourseCard key={course.id} course={course} />
					))}
				</div>
			) : (
				<div className='text-center py-12'>
					<p className='text-muted-foreground'>
						You havent enrolled in any courses yet.
					</p>
					<Link
						href='/courses'
						className='text-purple-400 hover:underline mt-2 inline-block'
					>
						Browse Courses
					</Link>
				</div>
			)}
		</Container>
	);
}
