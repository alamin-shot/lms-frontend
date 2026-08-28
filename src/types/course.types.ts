import { User } from './auth.types';

export interface Course {
	id: number;
	documentId: string;
	title: string;
	description: string;
	coverImage?: string;
	slug: string;
	lessons?: Lesson[];
	instructor?: User;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface Lesson {
	id: number;
	documentId: string;
	title: string;
	content: string;
	videoUrl?: string;
	order: number;
	course?: Course;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface CourseProgress {
	courseId: number;
	completedCount: number;
	totalCount: number;
	percentage: number;
	completedLessons: number[];
}

export interface CourseDetailPageProps {
	course: Course;
	isEnrolled?: boolean;
	initialCompletedLessonIds?: number[];
	onProgressUpdate?: (completedIds: number[]) => void;
}

export interface LessonListWithProgressProps {
	lessons: Lesson[];
	courseSlug: string;
	initialCompletedIds?: number[];
	onProgressUpdate?: (completedIds: number[]) => void;
}

// Lesson Player Props
export interface LessonPlayerProps {
	course: Course;
	lesson: Lesson;
	allLessons: Lesson[];
	isCompleted: boolean;
	onToggleComplete: () => void;
	nextLesson?: Lesson;
	prevLesson?: Lesson;
}
