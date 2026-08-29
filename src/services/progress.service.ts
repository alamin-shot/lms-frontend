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
			documentId: string;
			title: string;
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

	async getAllProgress(token?: string): Promise<Progress[]> {
		const response = await apiClient.get<ApiResponse<Progress[]>>(
			'/api/progress?populate[lesson][populate][course]=true&populate[user]=true',
			token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
		);
		return response.data.data;
	},
};
