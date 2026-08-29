import { apiClient } from '@/lib/api/client';
import { Course } from '@/types/course.types';
import { ApiResponse } from '@/types/api.types';
import { processCourses, processCourse } from '@/lib/utils/course-helpers';

export const courseService = {
	async getAll(token?: string): Promise<Course[]> {
		const response = await apiClient.get<ApiResponse<Course[]>>(
			'/api/courses?populate=*',
			token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
		);
		const data = response.data.data;
		if (!Array.isArray(data)) {
			return [];
		}
		return processCourses(data);
	},

	async getBySlug(slug: string, token?: string): Promise<Course> {
		try {
			const response = await apiClient.get<ApiResponse<Course[]>>(
				`/api/courses?filters[slug][$eq]=${slug}&populate[lessons]=true`,
				token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
			);
			const courses = response.data.data;
			if (Array.isArray(courses) && courses.length > 0) {
				return processCourse(courses[0]);
			}
		} catch {
			// Fall back to the collection endpoint below.
		}

		let allCourses: Course[] = [];
		try {
			allCourses = await this.getAll(token);
		} catch {
			allCourses = await this.getAll();
		}
		const fallbackCourse = allCourses.find((course) => course.slug === slug);
		if (!fallbackCourse) {
			throw new Error(`Course with slug "${slug}" not found`);
		}
		return fallbackCourse;
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
