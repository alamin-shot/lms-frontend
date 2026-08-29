import { apiClient } from '@/lib/api/client';
import {
	Quiz,
	Question,
	SubmitQuizRequest,
	SubmitQuizResponse,
} from '@/types/quiz.types';

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

export const quizService = {
	// Get quiz for a course
	async getQuizByCourse(courseId: number): Promise<Quiz | null> {
		try {
			const response = await apiClient.get<ApiResponse<Quiz[]>>(
				`/api/quizzes?filters[course][id][$eq]=${courseId}&populate[questions]=true`,
			);
			const quizzes = response.data.data;
			if (!Array.isArray(quizzes) || quizzes.length === 0) {
				return null;
			}
			return quizzes[0];
		} catch {
			return null;
		}
	},

	// Get questions for a quiz
	async getQuestions(quizId: number): Promise<Question[]> {
		const response = await apiClient.get<ApiResponse<Question[]>>(
			`/api/questions?filters[quiz][id][$eq]=${quizId}`,
		);
		return response.data.data;
	},

	// Submit quiz answers
	async submitQuiz(
		quizId: number,
		answers: string[],
	): Promise<SubmitQuizResponse> {
		const response = await apiClient.post<SubmitQuizResponse>(
			'/api/quiz-attempts/submit',
			{
				quizId,
				answers,
			},
		);
		return response.data;
	},

	// Get quiz attempts for a student
	async getAttempts(quizId: number): Promise<any[]> {
		try {
			const response = await apiClient.get<ApiResponse<any[]>>(
				`/api/quiz-attempts?filters[quiz][id][$eq]=${quizId}`,
			);
			return response.data.data;
		} catch {
			return [];
		}
	},
};
