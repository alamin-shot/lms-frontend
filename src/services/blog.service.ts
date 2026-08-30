import { apiClient } from '@/lib/api/client';
import { BlogPost } from '@/types/blog.types';
import { ApiResponse } from '@/types/api.types';
import { processBlogPosts, processBlogPost } from '@/lib/utils/blog-helpers';

export const blogService = {
	async getAll(token?: string, publishedOnly: boolean = false): Promise<BlogPost[]> {
		const url = publishedOnly
			? '/api/blogs?filters[publishDate][$notNull]=true&populate=*'
			: '/api/blogs?populate=*';
		const response = await apiClient.get<ApiResponse<BlogPost[]>>(url, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
		const data = response.data.data;
		if (!Array.isArray(data)) return [];
		return processBlogPosts(data);
	},

	async getBySlug(slug: string, token?: string): Promise<BlogPost> {
		const response = await apiClient.get<ApiResponse<BlogPost[]>>(
			`/api/blogs?filters[documentId][$eq]=${slug}&populate=*`,
			token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
		);
		const posts = response.data.data;
		if (!Array.isArray(posts) || posts.length === 0) {
			throw new Error(`Blog post with slug "${slug}" not found`);
		}
		return processBlogPost(posts[0]);
	},

	// ✅ FIXED: Create a new blog post
	async create(data: Partial<BlogPost>, token?: string): Promise<BlogPost> {
		// Convert body string to Strapi block array
		const bodyContent = typeof data.body === 'string' && data.body.length > 0
			? [{ type: 'paragraph', children: [{ type: 'text', text: data.body }] }]
			: [];

		const payload = {
			title: data.title,
			body: bodyContent,
			coverImage: data.coverImage || '',
		};

		const response = await apiClient.post<ApiResponse<BlogPost>>(
			'/api/blogs',
			{ data: payload },
			token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
		);
		return response.data.data;
	},

	async update(id: number, data: Partial<BlogPost>, documentId?: string, token?: string): Promise<BlogPost> {
		const endpoint = `/api/blogs/${documentId || id}`;
		const { id: _, documentId: __, createdAt: ___, updatedAt: ____, ...cleanData } = data;

		// Convert body string back to Strapi block array format
		if ('body' in cleanData && typeof cleanData.body === 'string') {
			(cleanData as Record<string, unknown>).body = cleanData.body
				? [{ type: 'paragraph', children: [{ type: 'text', text: cleanData.body }] }]
				: [];
		}

		const response = await apiClient.put<ApiResponse<BlogPost>>(
			endpoint,
			{ data: cleanData },
			token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
		);
		return response.data.data;
	},

	async delete(id: number, documentId?: string, token?: string): Promise<void> {
		await apiClient.delete(`/api/blogs/${documentId || id}`, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
	},
};