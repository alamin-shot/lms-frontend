import { z } from 'zod';

export const courseSchema = z.object({
	title: z.string().min(3, 'Title must be at least 3 characters'),
	description: z.string().min(10, 'Description must be at least 10 characters'),
	coverImage: z.string().url('Please enter a valid URL').optional(),
	slug: z.string().min(3, 'Slug must be at least 3 characters'),
});

export type CourseFormData = z.infer<typeof courseSchema>;
