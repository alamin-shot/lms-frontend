'use client';

import { Container } from '@/components/ui/container';
import { CourseDetailHeader } from './course-detail-header';
import { EnrollmentButton } from './enrollment-button';
import { CourseProgressBar } from './course-progress-bar';
import { CourseDetailPageProps } from '@/types/course.types';
import { LessonListWithProgress } from '../lesson/lesson-list-with-progress';
import { RoleAwareBackButton } from '@/components/ui/role-aware-back-button';


export function CourseDetailPage({
	course,
	isEnrolled = false,
	initialCompletedLessonIds = [],
	onProgressUpdate,
}: CourseDetailPageProps) {
	const lessons = course.lessons || [];

	const handleEnroll = () => {
		console.log('Enroll clicked');
	};

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
							{isEnrolled ? (
								<CourseProgressBar
									progress={0}
									completedCount={initialCompletedLessonIds.length}
									totalCount={lessons.length}
								/>
							) : (
								<p className='text-muted-foreground'>
									Enroll to track your progress and access all lessons.
								</p>
							)}
						</div>
						<EnrollmentButton isEnrolled={isEnrolled} onEnroll={handleEnroll} />
					</div>

					<LessonListWithProgress
						lessons={lessons}
						courseSlug={course.slug}
						initialCompletedIds={initialCompletedLessonIds}
						onProgressUpdate={onProgressUpdate}
					/>
				</div>
			</Container>
		</main>
	);
}
