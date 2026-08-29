import { apiClient } from '@/lib/api/client';

export interface Progress {
	id: number;
	documentId: string;
	completed: boolean;
	lesson: {
		id: number;
		documentId: string;
		title: string;
		course?: {
			id: number;
		};
	};
	user: {
		id: number;
	};
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

interface ApiResponse<T> {
	data: T;
	meta?: {
		pagination?: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

export const progressService = {
	// Toggle lesson completion
	async toggleComplete(lessonId: number): Promise<{
		progress: Progress;
		courseProgress: number;
		completedCount: number;
		totalCount: number;
	}> {
		const response = await apiClient.post('/api/progress/toggle', {
			lessonId,
		});
		return response.data;
	},

	// Get progress for a specific course
	async getCourseProgress(
		courseId: number,
		token?: string,
	): Promise<{
		progress: Progress[];
		courseProgress: number;
		completedCount: number;
		totalCount: number;
	}> {
		const response = await apiClient.get(
			`/api/progress/course/${courseId}`,
			token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
		);
		return response.data;
	},

	// Get all progress for the current user
	async getAllProgress(token?: string): Promise<Progress[]> {
		const response = await apiClient.get<ApiResponse<Progress[]>>(
			'/api/progress?populate[lesson][populate][course]=true&populate[user]=true',
			token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
		);
		return response.data.data;
	},
};
