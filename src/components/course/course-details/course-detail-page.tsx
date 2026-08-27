import { Container } from '@/components/ui/container';
import { CourseDetailHeader } from './course-detail-header';
import { LessonList } from './lesson-list';
import { EnrollmentButton } from './enrollment-button';
import { CourseProgressBar } from './course-progress-bar';
import { Course } from '@/types/course.types';
import BackButton from '@/components/ui/back-button';

interface CourseDetailPageProps {
	course: Course;
	isEnrolled?: boolean;
	completedLessonIds?: number[];
	progress?: number;
}

export function CourseDetailPage({
	course,
	isEnrolled = false,
	completedLessonIds = [],
	progress = 0,
}: CourseDetailPageProps) {
	const lessons = course.lessons || [];

	// const handleEnroll = () => {
	// 	console.log('Enroll clicked');
	// };

	const handleToggleComplete = (lessonId: number) => {
		console.log('Toggle complete:', lessonId);
	};

	return (
		<main className='py-8'>
			<Container>
				{/* Back Button */}
				<div className='mb-6'>
					<BackButton href='/courses' label='Back to Courses' />
				</div>

				<div className='space-y-8'>
					{/* Header */}
					<CourseDetailHeader course={course} />

					{/* Progress & Enrollment */}
					<div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-xl border border-border/50 bg-card/30'>
						<div className='w-full md:w-1/2'>
							{isEnrolled ? (
								<CourseProgressBar
									progress={progress}
									completedCount={completedLessonIds.length}
									totalCount={lessons.length}
								/>
							) : (
								<p className='text-muted-foreground'>
									Enroll to track your progress and access all lessons.
								</p>
							)}
						</div>
						<EnrollmentButton
							isEnrolled={isEnrolled}
							//  onEnroll={handleEnroll}
						/>
					</div>

					{/* Lessons */}
					<LessonList
						lessons={lessons}
						isEnrolled={isEnrolled}
						completedLessonIds={completedLessonIds}
						onToggleComplete={handleToggleComplete}
					/>
				</div>
			</Container>
		</main>
	);
}
