import { Course } from '@/types/course.types';
import { Badge } from '@/components/ui/badge';
import { User, BookOpen, Clock } from 'lucide-react';
import Image from 'next/image';

interface CourseDetailHeaderProps {
	course: Course;
}

export function CourseDetailHeader({ course }: CourseDetailHeaderProps) {
	return (
		<div className='relative rounded-xl overflow-hidden bg-linear-to-r from-purple-900/30 to-background border border-border/50'>
			<div className='flex flex-col md:flex-row gap-8 p-6 md:p-10'>
				{/* Image */}
				<div className='md:w-1/3 lg:w-1/4'>
					<div className='aspect-video rounded-lg overflow-hidden bg-muted'>
						{course.coverImage ? (
							<Image
								src={course.coverImage}
								alt={course.title}
								width={400}
								height={250}
								className='w-full h-full object-cover'
							/>
						) : (
							<div className='w-full h-full flex items-center justify-center text-muted-foreground'>
								<BookOpen className='h-12 w-12' />
							</div>
						)}
					</div>
				</div>

				{/* Content */}
				<div className='md:w-2/3 lg:w-3/4 flex flex-col justify-center'>
					<Badge className='w-fit mb-3 bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 border-purple-500/30'>
						{course.lessons?.length || 0} Lessons
					</Badge>
					<h1 className='text-3xl md:text-4xl font-bold'>{course.title}</h1>
					<p className='text-muted-foreground mt-3 text-lg'>
						{course.description}
					</p>
					<div className='flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground'>
						<span className='flex items-center gap-1'>
							<User className='h-4 w-4' />
							{course.instructor?.username || 'Unknown Instructor'}
						</span>
						<span className='flex items-center gap-1'>
							<Clock className='h-4 w-4' />
							Updated {new Date(course.updatedAt).toLocaleDateString()}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
