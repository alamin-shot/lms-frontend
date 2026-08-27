import { User } from "./auth.types";
import { Lesson } from "./course.types";

export interface Progress {
	id: number;
	documentId: string;
	completed: boolean;
	user: User;
	lesson: Lesson;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface ProgressResponse {
	progress: Progress;
	courseProgress: number;
	completedCount: number;
	totalCount: number;
}

export interface ToggleProgressRequest {
	lessonId: number;
}
