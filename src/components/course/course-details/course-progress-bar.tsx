'use client';

import { Progress } from '@/components/ui/progress';

interface CourseProgressBarProps {
	progress: number; // 0-100
	completedCount: number;
	totalCount: number;
}

export function CourseProgressBar({
	progress,
	completedCount,
	totalCount,
}: CourseProgressBarProps) {
	return (
		<div className='space-y-2'>
			<div className='flex justify-between text-sm'>
				<span className='text-muted-foreground'>Your Progress</span>
				<span className='font-medium'>{progress}%</span>
			</div>
			<Progress value={progress} className='h-2' />
			<p className='text-xs text-muted-foreground'>
				{completedCount} of {totalCount} lessons completed
			</p>
		</div>
	);
}
