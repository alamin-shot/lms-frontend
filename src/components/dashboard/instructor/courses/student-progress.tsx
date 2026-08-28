import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
	getStudentsForCourse,
	getProgressPercentage,
} from '@/mocks/student-progress';

interface StudentProgressProps {
	courseId: number;
}

export function StudentProgress({ courseId }: StudentProgressProps) {
	const students = getStudentsForCourse(courseId);

	if (students.length === 0) {
		return (
			<div className='text-center py-8 text-muted-foreground'>
				No students enrolled in this course yet
			</div>
		);
	}

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<h3 className='font-semibold'>Enrolled Students ({students.length})</h3>
			</div>
			<div className='space-y-3'>
				{students.map((student) => {
					const progress = getProgressPercentage(
						student.completedLessons,
						student.totalLessons,
					);
					const isComplete = progress === 100;

					return (
						<Card key={student.id} className='overflow-hidden'>
							<CardContent className='p-4'>
								<div className='flex flex-col md:flex-row md:items-center justify-between gap-3'>
									<div className='space-y-1'>
										<div className='flex items-center gap-2'>
											<h4 className='font-medium'>{student.studentName}</h4>
											{isComplete && (
												<Badge className='bg-green-500/20 text-green-500 border-green-500/30'>
													✅ Completed
												</Badge>
											)}
										</div>
										<p className='text-sm text-muted-foreground'>
											{student.studentEmail}
										</p>
									</div>
									<div className='w-full md:w-48 space-y-1'>
										<div className='flex justify-between text-sm'>
											<span className='text-muted-foreground'>Progress</span>
											<span className='font-medium'>{progress}%</span>
										</div>
										<Progress value={progress} className='h-2' />
										<p className='text-xs text-muted-foreground text-right'>
											{student.completedLessons.length} / {student.totalLessons}{' '}
											lessons
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
