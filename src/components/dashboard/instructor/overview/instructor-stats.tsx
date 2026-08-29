import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InstructorStatsProps } from '@/types/instructor.types';

export function InstructorStats({ courses }: InstructorStatsProps) {
	const totalLessons = courses.reduce(
		(acc, course) => acc + (course.lessons?.length || 0),
		0,
	);

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
					<p className='text-2xl font-bold'>{totalLessons}</p>
				</CardContent>
			</Card>
		</div>
	);
}
