import { z } from 'zod';

export const loginSchema = z.object({
	identifier: z.string().min(1, 'Email or username is required'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
	.object({
		username: z.string().min(3, 'Username must be at least 3 characters'),
		email: z.string().email('Invalid email address'),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string(),
		role: z.enum(['Student', 'Instructor', 'Content Manager'], {
			required_error: 'Please select a role',
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export type RegisterFormData = z.infer<typeof registerSchema>;
