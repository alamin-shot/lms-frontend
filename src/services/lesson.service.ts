import { apiClient } from '@/lib/api/client';
import { Lesson } from '@/types/course.types';
import { ApiResponse } from '@/types/api.types';
import { richTextToPlainText } from '@/lib/utils/rich-text';

const toRichText = (text: string) => [
	{
		type: 'paragraph',
		children: [{ type: 'text', text }],
	},
];

export const lessonService = {
	// Get all lessons for a course
	async getByCourse(courseId: number, token?: string): Promise<Lesson[]> {
		const response = await apiClient.get<ApiResponse<Lesson[]>>(
			`/api/lessons?filters[course][id][$eq]=${courseId}&populate=*`,
			token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
		);
		return response.data.data.map((lesson) => ({
			...lesson,
			content: richTextToPlainText(lesson.content),
		}));
	},

	// Get a single lesson by ID
	async getById(id: number, token?: string): Promise<Lesson> {
		const response = await apiClient.get<ApiResponse<Lesson[]>>(
			`/api/lessons?filters[id][$eq]=${id}&populate=*`,
			token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
		);
		const lesson = response.data.data[0];
		if (!lesson) {
			throw new Error(`Lesson with id ${id} not found`);
		}
		return {
			...lesson,
			content: richTextToPlainText(lesson.content),
		};
	},

	// Create a new lesson
	async create(courseId: number, data: Partial<Lesson>): Promise<Lesson> {
		const payload = {
			...data,
			course: courseId,
			content:
				typeof data.content === 'string'
					? toRichText(data.content)
					: (data.content ?? []),
		};
		const response = await apiClient.post<ApiResponse<Lesson>>('/api/lessons', {
			data: payload,
		});
		return response.data.data;
	},

	// Update a lesson
	async update(
		id: number,
		data: Partial<Lesson>,
		documentId?: string,
	): Promise<Lesson> {
		const payload = {
			...data,
			content:
				typeof data.content === 'string'
					? toRichText(data.content)
					: (data.content ?? []),
		};
		const response = await apiClient.put<ApiResponse<Lesson>>(
			`/api/lessons/${documentId || id}`,
			{ data: payload },
		);
		return response.data.data;
	},

	// Delete a lesson
	async delete(id: number, documentId?: string): Promise<void> {
		await apiClient.delete(`/api/lessons/${documentId || id}`);
	},
};
