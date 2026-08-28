import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Course } from '@/types/course.types';

interface InstructorStatsProps {
	courses: Course[];
}

export function InstructorStats({ courses }: InstructorStatsProps) {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='text-sm font-medium text-muted-foreground'>
						Total Courses
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-2xl font-bold'>{courses.length}</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='text-sm font-medium text-muted-foreground'>
						Total Students
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-2xl font-bold'>0</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='text-sm font-medium text-muted-foreground'>
						Total Lessons
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-2xl font-bold'>
						{courses.reduce((acc, c) => acc + (c.lessons?.length || 0), 0)}
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
