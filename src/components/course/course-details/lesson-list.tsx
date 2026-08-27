import { Lesson } from '@/types/course.types';
import { LessonItem } from './lesson-item';

interface LessonListProps {
	lessons: Lesson[];
	isEnrolled: boolean;
	completedLessonIds?: number[];
	onToggleComplete?: (lessonId: number) => void;
}

export function LessonList({
	lessons,
	isEnrolled,
	completedLessonIds = [],
	onToggleComplete,
}: LessonListProps) {
	// Sort lessons by order
	const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

	return (
		<div className='space-y-2'>
			<h3 className='text-lg font-semibold mb-4'>
				Course Content ({sortedLessons.length} lessons)
			</h3>
			<div className='space-y-2'>
				{sortedLessons.map((lesson) => (
					<LessonItem
						key={lesson.id}
						lesson={lesson}
						isEnrolled={isEnrolled}
						isCompleted={completedLessonIds.includes(lesson.id)}
						onToggleComplete={onToggleComplete}
					/>
				))}
			</div>
		</div>
	);
}
