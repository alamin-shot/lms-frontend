import { apiClient } from '@/lib/api/client';
import { LessonSummary } from '@/types/course.types';
import { richTextToPlainText } from '@/lib/utils/rich-text';

// Simplified course type for enrollment (only needs what the dashboard uses)
export interface EnrollmentCourse {
	id: number;
	documentId: string;
	title: string;
	description: string;
	coverImage?: string;
	slug: string;
	lessons: LessonSummary[];
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface Enrollment {
	id: number;
	documentId: string;
	course: EnrollmentCourse;
	user: {
		id: number;
		username: string;
		email: string;
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

export const enrollmentService = {
	async enroll(courseId: number): Promise<void> {
		await apiClient.post('/api/enrollments', {
			data: {
				course: courseId,
			},
		});
	},

	async getUserEnrollments(token?: string): Promise<Enrollment[]> {
		const storedToken =
			token ??
			(typeof window !== 'undefined' ? localStorage.getItem('jwt') : null);
		console.log('🔍 Token:', storedToken);
		const response = await apiClient.get<ApiResponse<Enrollment[]>>(
			'/api/enrollments?populate[course][populate][lessons]=true',
			storedToken
				? { headers: { Authorization: `Bearer ${storedToken}` } }
				: undefined,
		);
		return response.data.data.map((enrollment) => ({
			...enrollment,
			course: {
				...enrollment.course,
				description: richTextToPlainText(enrollment.course.description),
			},
		}));
	},

	async isEnrolled(courseId: number, token?: string): Promise<boolean> {
		try {
			const storedToken =
				token ??
				(typeof window !== 'undefined' ? localStorage.getItem('jwt') : null);
			const response = await apiClient.get<ApiResponse<Enrollment[]>>(
				`/api/enrollments?filters[course][id][$eq]=${courseId}`,
				storedToken
					? { headers: { Authorization: `Bearer ${storedToken}` } }
					: undefined,
			);
			console.log('🔍 isEnrolled response:', response.data);
			return Array.isArray(response.data.data) && response.data.data.length > 0;
		} catch {
			return false;
		}
	},
};
