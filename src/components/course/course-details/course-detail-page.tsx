'use client';

import { Container } from '@/components/ui/container';
import { CourseDetailHeader } from './course-detail-header';
import { EnrollmentButton } from './enrollment-button';
import { CourseProgressBar } from './course-progress-bar';
import { CourseDetailPageProps } from '@/types/course.types';
import { LessonListWithProgress } from '../lesson/lesson-list-with-progress';
import { RoleAwareBackButton } from '@/components/ui/role-aware-back-button';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { startTransition, useEffect, useState } from 'react';

export function CourseDetailPage({
	course,
	isEnrolled = false,
	initialCompletedLessonIds = [],
	onProgressUpdate,
}: CourseDetailPageProps) {
	const lessons = course.lessons || [];
	const [enrolled, setEnrolled] = useState(isEnrolled);
	const [completedIds, setCompletedIds] = useState(initialCompletedLessonIds);

	useEffect(() => {
		const stored = localStorage.getItem(`course-progress:${course.slug}`);
		if (stored) {
			startTransition(() => setCompletedIds(JSON.parse(stored)));
		}
	}, [course.slug]);

	const handleEnroll = () => {
		setEnrolled(true);
		onProgressUpdate?.([]);
	};

	const handleProgressUpdate = (newCompletedIds: number[]) => {
		setCompletedIds(newCompletedIds);
		onProgressUpdate?.(newCompletedIds);
	};

	const progress =
		lessons.length > 0
			? Math.round((completedIds.length / lessons.length) * 100)
			: 0;

	return (
		<main className='py-8'>
			<Container>
				<div className='mb-6'>
					<RoleAwareBackButton />
				</div>

				<div className='space-y-8'>
					<CourseDetailHeader course={course} />

					<div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-xl border border-border/50 bg-card/30'>
						<div className='w-full md:w-1/2'>
							{enrolled ? (
								<CourseProgressBar
									progress={progress}
									completedCount={completedIds.length}
									totalCount={lessons.length}
								/>
							) : (
								<p className='text-muted-foreground'>
									Enroll to track your progress and access all lessons.
								</p>
							)}
						</div>
						<EnrollmentButton
							courseId={course.id}
							isEnrolled={enrolled}
							onEnroll={handleEnroll}
						/>
					</div>

					<LessonListWithProgress
						lessons={lessons}
						courseSlug={course.slug}
						initialCompletedIds={completedIds}
						onProgressUpdate={handleProgressUpdate}
					/>

					{enrolled && (
						<div className='mt-8 p-6 rounded-xl border border-purple-500/30 bg-purple-500/10'>
							<div className='flex items-center justify-between'>
								<div>
									<h3 className='font-semibold'>
										Ready to test your knowledge?
									</h3>
									<p className='text-sm text-muted-foreground'>
										Take the course quiz to earn your certificate
									</p>
								</div>
								<Link href={`/dashboard/student/courses/${course.slug}/quiz`}>
									<Button className='bg-purple-600 hover:bg-purple-700'>
										Take Quiz
									</Button>
								</Link>
							</div>
						</div>
					)}
				</div>
			</Container>
		</main>
	);
}
