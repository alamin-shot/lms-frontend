import { z } from 'zod';

export const lessonSchema = z.object({
	title: z.string().min(3, 'Title must be at least 3 characters'),
	content: z.string().min(10, 'Content must be at least 10 characters'),
	videoUrl: z
		.union([z.string().url('Please enter a valid URL'), z.literal('')])
		.optional()
		.transform((value) => (value === '' ? undefined : value)),
	order: z.number().min(0, 'Order must be 0 or greater'),
});

export type LessonFormData = z.infer<typeof lessonSchema>;
