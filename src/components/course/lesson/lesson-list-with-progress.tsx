'use client';

import { startTransition, useEffect, useState } from 'react';
import { LessonListWithProgressProps } from '@/types/course.types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Play } from 'lucide-react';
import Link from 'next/link';

export function LessonListWithProgress({
	lessons,
	courseSlug,
	initialCompletedIds = [],
	onProgressUpdate,
}: LessonListWithProgressProps) {
	const [completedIds, setCompletedIds] =
		useState<number[]>(initialCompletedIds);

	useEffect(() => {
		const stored = localStorage.getItem(`course-progress:${courseSlug}`);
		if (stored) {
			startTransition(() => setCompletedIds(JSON.parse(stored)));
		}
	}, [courseSlug]);

	const toggleComplete = (lessonId: number) => {
		const newCompletedIds = completedIds.includes(lessonId)
			? completedIds.filter((id) => id !== lessonId)
			: [...completedIds, lessonId];
		setCompletedIds(newCompletedIds);
		localStorage.setItem(
			`course-progress:${courseSlug}`,
			JSON.stringify(newCompletedIds),
		);
		onProgressUpdate?.(newCompletedIds);
	};

	const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

	return (
		<div className='space-y-3'>
			<div className='flex justify-between items-center mb-4'>
				<h3 className='text-lg font-semibold'>Course Content</h3>
				<Badge variant='outline'>
					{completedIds.length} / {sortedLessons.length} complete
				</Badge>
			</div>

			{sortedLessons.map((lesson) => {
				const isCompleted = completedIds.includes(lesson.id);

				return (
					<div
						key={lesson.id}
						className='flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-purple-500/30 transition-colors group'
					>
						{/* Status Icon */}
						<div className='shrink-0'>
							{isCompleted ? (
								<CheckCircle2 className='h-5 w-5 text-green-500' />
							) : (
								<Circle className='h-5 w-5 text-muted-foreground group-hover:text-purple-500 transition-colors' />
							)}
						</div>

						{/* Lesson Info */}
						<div className='flex-1 min-w-0'>
							<div className='flex items-center gap-2'>
								<span className='text-sm text-muted-foreground'>
									#{lesson.order}
								</span>
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
							<Link href={`/courses/${courseSlug}/lessons/${lesson.id}`}>
								<Button variant='ghost' size='sm' className='gap-1'>
									<Play className='h-3 w-3' /> Watch
								</Button>
							</Link>
							<Button
								variant={isCompleted ? 'outline' : 'ghost'}
								size='sm'
								onClick={() => toggleComplete(lesson.id)}
							>
								{isCompleted ? 'Undo' : 'Complete'}
							</Button>
						</div>
					</div>
				);
			})}
		</div>
	);
}
