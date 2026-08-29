import { apiClient } from '@/lib/api/client';
import { BlogPost } from '@/types/blog.types';
import { ApiResponse } from '@/types/api.types';
import { processBlogPosts, processBlogPost } from '@/lib/utils/blog-helpers';

export const blogService = {
	// Get all published blog posts
	async getAll(): Promise<BlogPost[]> {
		const response = await apiClient.get<ApiResponse<BlogPost[]>>(
			'/api/blogs?filters[publishDate][$notNull]=true&populate=*',
		);
		const data = response.data.data;
		if (!Array.isArray(data)) {
			return [];
		}
		return processBlogPosts(data);
	},

	// Get a single blog post by slug (documentId)
	async getBySlug(slug: string): Promise<BlogPost> {
		const response = await apiClient.get<ApiResponse<BlogPost[]>>(
			`/api/blogs?filters[documentId][$eq]=${slug}&populate=*`,
		);
		const posts = response.data.data;
		if (!Array.isArray(posts) || posts.length === 0) {
			throw new Error(`Blog post with slug "${slug}" not found`);
		}
		return processBlogPost(posts[0]);
	},

	// Create a new blog post (for Content Manager)
	async create(data: Partial<BlogPost>): Promise<BlogPost> {
		const response = await apiClient.post<ApiResponse<BlogPost>>('/api/blogs', {
			data,
		});
		return response.data.data;
	},

	// Update a blog post
	async update(id: number, data: Partial<BlogPost>): Promise<BlogPost> {
		const response = await apiClient.put<ApiResponse<BlogPost>>(
			`/api/blogs/${id}`,
			{ data },
		);
		return response.data.data;
	},

	// Delete a blog post
	async delete(id: number): Promise<void> {
		await apiClient.delete(`/api/blogs/${id}`);
	},
};
