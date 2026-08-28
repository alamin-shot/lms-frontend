import { Course } from '@/types/course.types';
import { getProgressForCourse } from '@/mocks';
import { ProgressIndicator } from './progress-indicator';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

interface EnrolledCourseCardProps {
	course: Course;
}

export function EnrolledCourseCard({ course }: EnrolledCourseCardProps) {
	const totalLessons = course.lessons?.length || 0;
	const progress = getProgressForCourse(course.id);
	const completedLessonIds = progress?.completedLessonIds || [];

	return (
		<div className='group rounded-xl border border-border/50 bg-card/50 overflow-hidden hover:-translate-y-2 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20'>
			<div className='aspect-video overflow-hidden bg-muted'>
				{course.coverImage ? (
					<Image
						src={course.coverImage}
						alt={course.title}
						width={400}
						height={250}
						className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center text-muted-foreground'>
						<BookOpen className='h-8 w-8' />
					</div>
				)}
			</div>
			<div className='p-5'>
				<h3 className='font-semibold line-clamp-1'>{course.title}</h3>
				<p className='text-sm text-muted-foreground mt-1 line-clamp-2'>
					{course.description}
				</p>
				<p className='text-xs text-muted-foreground mt-2'>
					By {course.instructor?.username || 'Unknown'}
				</p>

				{/* Progress Indicator */}
				<ProgressIndicator
					courseId={course.id}
					totalLessons={totalLessons}
					completedLessonIds={completedLessonIds}
				/>

				<Link href={`/dashboard/student/courses/${course.slug}`}>
					<Button variant='outline' size='sm' className='mt-4 w-full'>
						Continue Learning
					</Button>
				</Link>
			</div>
		</div>
	);
}
