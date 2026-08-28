'use client';

import { Lesson } from '@/types/course.types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Play, Lock } from 'lucide-react';
import Link from 'next/link';

interface LessonItemProps {
	lesson: Lesson;
	isEnrolled: boolean;
	isCompleted?: boolean;
	onToggleComplete?: (lessonId: number) => void;
}

export function LessonItem({
	lesson,
	isEnrolled,
	isCompleted = false,
	onToggleComplete,
}: LessonItemProps) {
	return (
		<div className='flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-purple-500/30 transition-colors group'>
			{/* Status Icon */}
			<div className='shrink-0'>
				{isCompleted ? (
					<CheckCircle2 className='h-5 w-5 text-green-500' />
				) : isEnrolled ? (
					<Circle className='h-5 w-5 text-muted-foreground group-hover:text-purple-500 transition-colors' />
				) : (
					<Lock className='h-5 w-5 text-muted-foreground' />
				)}
			</div>

			{/* Lesson Info */}
			<div className='flex-1 min-w-0'>
				<div className='flex items-center gap-2'>
					<span className='text-sm text-muted-foreground'>#{lesson.order}</span>
					<h4 className='font-medium truncate'>{lesson.title}</h4>
					{isCompleted && (
						<Badge
							variant='outline'
							className='text-xs border-green-500/30 text-green-500'
						>
							Complete
						</Badge>
					)}
				</div>
				<p className='text-sm text-muted-foreground truncate'>
					{lesson.videoUrl ? '📹 Video lesson' : '📝 Text lesson'}
				</p>
			</div>

			{/* Actions */}
			<div className='shrink-0 flex items-center gap-2'>
				{isEnrolled && (
					<Link href={`/courses/${lesson.course?.slug}/lessons/${lesson.id}`}>
						<Button variant='ghost' size='sm' className='gap-1'>
							<Play className='h-3 w-3' /> Watch
						</Button>
					</Link>
				)}
				{isEnrolled && onToggleComplete && (
					<Button
						variant={isCompleted ? 'outline' : 'ghost'}
						size='sm'
						onClick={() => onToggleComplete(lesson.id)}
					>
						{isCompleted ? 'Undo' : 'Complete'}
					</Button>
				)}
			</div>
		</div>
	);
}
