import { z } from 'zod';

export const blogSchema = z.object({
	title: z.string().min(3, 'Title must be at least 3 characters'),
	body: z.string().min(10, 'Content must be at least 10 characters'),
	coverImage: z.string().url('Please enter a valid URL').optional(),
	publishDate: z.string().optional(),
});

export type BlogFormData = z.infer<typeof blogSchema>;
