import { User } from "./auth.types";

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
