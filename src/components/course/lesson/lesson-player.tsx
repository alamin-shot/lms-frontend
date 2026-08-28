'use client';

import { LessonPlayerProps } from '@/types/course.types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';

export function LessonPlayer({
	course,
	lesson,
	allLessons,
	isCompleted,
	onToggleComplete,
	nextLesson,
	prevLesson,
}: LessonPlayerProps) {
	const totalLessons = allLessons.length;
	const currentIndex = allLessons.findIndex((l) => l.id === lesson.id) + 1;

	return (
		<Container className='py-8'>
			{/* Back to Course */}
			<div className='mb-6'>
				<Link
					href={`/dashboard/student/courses/${course.slug}`}
					className='text-sm text-muted-foreground hover:text-foreground transition-colors'
				>
					← Back to {course.title}
				</Link>
			</div>

			{/* Lesson Header */}
			<div className='mb-6'>
				<div className='flex items-center gap-3 mb-2'>
					<Badge variant='outline'>
						Lesson {currentIndex} of {totalLessons}
					</Badge>
					{isCompleted && (
						<Badge className='bg-green-500/20 text-green-500 border-green-500/30'>
							Completed
						</Badge>
					)}
				</div>
				<h1 className='text-2xl md:text-3xl font-bold'>{lesson.title}</h1>
			</div>

			{/* Video or Content */}
			<div className='mb-8'>
				{lesson.videoUrl ? (
					<div className='aspect-video rounded-xl overflow-hidden bg-muted'>
						<iframe
							src={lesson.videoUrl}
							title={lesson.title}
							className='w-full h-full'
							allowFullScreen
						/>
					</div>
				) : (
					<div
						className='prose prose-invert max-w-none p-6 rounded-xl border border-border/50 bg-card/30'
						dangerouslySetInnerHTML={{ __html: lesson.content }}
					/>
				)}
			</div>

			{/* Actions */}
			<div className='flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-border/50 bg-card/30'>
				<Button
					variant={isCompleted ? 'outline' : 'default'}
					onClick={onToggleComplete}
					className={!isCompleted ? 'bg-purple-600 hover:bg-purple-700' : ''}
				>
					{isCompleted ? (
						<>
							<CheckCircle2 className='h-4 w-4 mr-2' /> Completed
						</>
					) : (
						<>
							<Circle className='h-4 w-4 mr-2' /> Mark Complete
						</>
					)}
				</Button>

				<div className='flex gap-2'>
					{prevLesson && (
						<Link
							href={`/dashboard/student/courses/${course.slug}/lessons/${prevLesson.id}`}
						>
							<Button variant='outline' className='gap-1'>
								<ChevronLeft className='h-4 w-4' /> Previous
							</Button>
						</Link>
					)}
					{nextLesson && (
						<Link
							href={`/dashboard/student/courses/${course.slug}/lessons/${nextLesson.id}`}
						>
							<Button variant='outline' className='gap-1'>
								Next <ChevronRight className='h-4 w-4' />
							</Button>
						</Link>
					)}
				</div>
			</div>
		</Container>
	);
}
