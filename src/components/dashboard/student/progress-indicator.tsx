import { Progress } from '@/components/ui/progress';

interface ProgressIndicatorProps {
	courseId: number;
	totalLessons: number;
	completedLessonIds: number[];
}

export function ProgressIndicator({
	courseId,
	totalLessons,
	completedLessonIds,
}: ProgressIndicatorProps) {
	const completed = completedLessonIds.length;
	const percentage =
		totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

	return (
		<div className='space-y-1 mt-3'>
			<div className='flex justify-between text-xs text-muted-foreground'>
				<span>Progress</span>
				<span>{percentage}%</span>
			</div>
			<Progress value={percentage} className='h-2' />
			<p className='text-xs text-muted-foreground'>
				{completed} of {totalLessons} lessons completed
			</p>
		</div>
	);
}
