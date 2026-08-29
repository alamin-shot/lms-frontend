import { apiClient } from '@/lib/api/client';
import { Quiz, Question, SubmitQuizResponse } from '@/types/quiz.types';

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


interface QuizAttempt {
	id: number;
	documentId: string;
	score: number;
	answers: string[];
	results: {
		questionId: number;
		userAnswer: string;
		correctAnswer: string;
		isCorrect: boolean;
	}[];
	user: {
		id: number;
		username: string;
	};
	quiz: Quiz;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export const quizService = {
	async getQuizByCourse(courseId: number): Promise<Quiz | null> {
		const quizResponse = await apiClient.get<ApiResponse<Quiz[]>>(
			`/api/quizzes?filters[course][id][$eq]=${courseId}`,
		);
		const quiz = quizResponse.data.data[0];
		if (!quiz) return null;

		const questionsResponse = await apiClient.get<ApiResponse<Question[]>>(
			`/api/questions?filters[quiz][id][$eq]=${quiz.id}`,
		);
		quiz.questions = questionsResponse.data.data;

		return quiz;
	},

	async getQuestions(quizId: number): Promise<Question[]> {
		const response = await apiClient.get<ApiResponse<Question[]>>(
			`/api/questions?filters[quiz][id][$eq]=${quizId}`,
		);
		return response.data.data;
	},

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

	async getAttempts(quizId: number): Promise<QuizAttempt[]> {
		try {
			const response = await apiClient.get<ApiResponse<QuizAttempt[]>>(
				`/api/quiz-attempts?filters[quiz][id][$eq]=${quizId}`,
			);
			return response.data.data;
		} catch {
			return [];
		}
	},
};
