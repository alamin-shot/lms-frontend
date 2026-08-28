import { z } from 'zod';

export const quizSchema = z.object({
	title: z.string().min(3, 'Title must be at least 3 characters'),
});

export type QuizFormData = z.infer<typeof quizSchema>;

export const questionSchema = z.object({
	questionText: z.string().min(5, 'Question must be at least 5 characters'),
	options: z.array(z.string()).length(4, 'Must have exactly 4 options'),
	correctAnswer: z.string().min(1, 'Please select the correct answer'),
});

export type QuestionFormData = z.infer<typeof questionSchema>;
