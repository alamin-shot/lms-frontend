import { apiClient } from '@/lib/api/client';
import { Question } from '@/types/quiz.types';
import { ApiResponse } from '@/types/api.types';

export const questionService = {
	// Get all questions for a quiz
	async getByQuiz(quizId: number, token?: string): Promise<Question[]> {
		const response = await apiClient.get<ApiResponse<Question[]>>(
			`/api/questions?filters[quiz][id][$eq]=${quizId}`,
			token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
		);
		return response.data.data;
	},

	// Get a single question by ID
	async getById(id: number, token?: string): Promise<Question> {
		const response = await apiClient.get<ApiResponse<Question[]>>(
			`/api/questions?filters[id][$eq]=${id}`,
			token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
		);
		const question = response.data.data[0];
		if (!question) {
			throw new Error(`Question with id ${id} not found`);
		}
		return question;
	},

	// Create a new question
	async create(quizId: number, data: Partial<Question>): Promise<Question> {
		const response = await apiClient.post<ApiResponse<Question>>(
			'/api/questions',
			{
				data: {
					...data,
					quiz: quizId,
				},
			},
		);
		return response.data.data;
	},

	// Update a question
	async update(
		id: number,
		data: Partial<Question>,
		documentId?: string,
	): Promise<Question> {
		const response = await apiClient.put<ApiResponse<Question>>(
			`/api/questions/${documentId || id}`,
			{ data },
		);
		return response.data.data;
	},

	// Delete a question
	async delete(id: number, documentId?: string): Promise<void> {
		await apiClient.delete(`/api/questions/${documentId || id}`);
	},
};
