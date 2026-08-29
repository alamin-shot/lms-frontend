import { Course, Lesson } from './course.types';

export interface LessonPageComponentProps {
	params: Promise<{ slug: string; lessonId: string }>;
}

export interface LessonPageState {
	loading: boolean;
	course: Course | null;
	allLessons: Lesson[];
	lesson: Lesson | null;
	isCompleted: boolean;
	prevLesson: Lesson | undefined;
	nextLesson: Lesson | undefined;
}
