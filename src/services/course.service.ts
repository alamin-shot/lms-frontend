import { apiClient } from '@/lib/api/client';
import { Course } from '@/types/course.types';
import { ApiResponse } from '@/types/api.types';
import { processCourses, processCourse } from '@/lib/utils/course-helpers';

export const courseService = {
	async getAll(): Promise<Course[]> {
		const response = await apiClient.get<ApiResponse<Course[]>>(
			'/api/courses?populate=*',
		);
		const data = response.data.data;
		if (!Array.isArray(data)) {
			return [];
		}
		return processCourses(data);
	},

	async getBySlug(slug: string, token?: string): Promise<Course> {
		const response = await apiClient.get<ApiResponse<Course[]>>(
			`/api/courses?filters[slug][$eq]=${slug}&populate[lessons]=true`,
			token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
		);
		const courses = response.data.data;
		if (!Array.isArray(courses) || courses.length === 0) {
			throw new Error(`Course with slug "${slug}" not found`);
		}
		return processCourse(courses[0]);
	},

	async create(data: Partial<Course>): Promise<Course> {
		const response = await apiClient.post<ApiResponse<Course>>('/api/courses', {
			data,
		});
		return response.data.data;
	},

	async update(id: number, data: Partial<Course>): Promise<Course> {
		const response = await apiClient.put<ApiResponse<Course>>(
			`/api/courses/${id}`,
			{ data },
		);
		return response.data.data;
	},

	async delete(id: number): Promise<void> {
		await apiClient.delete(`/api/courses/${id}`);
	},
};
