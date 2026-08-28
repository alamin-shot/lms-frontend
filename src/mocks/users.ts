import { User } from '@/types/auth.types';

export const mockUsers: User[] = [
	{
		id: 1,
		username: 'adminuser',
		email: 'admin@example.com',
		role: {
			id: 1,
			name: 'Admin',
		},
	},
	{
		id: 2,
		username: 'contentmanager',
		email: 'cm@example.com',
		role: {
			id: 2,
			name: 'Content Manager',
		},
	},
	{
		id: 3,
		username: 'instructor1',
		email: 'instructor1@example.com',
		role: {
			id: 3,
			name: 'Instructor',
		},
	},
	{
		id: 4,
		username: 'student1',
		email: 'student1@example.com',
		role: {
			id: 4,
			name: 'Student',
		},
	},
	{
		id: 5,
		username: 'student2',
		email: 'student2@example.com',
		role: {
			id: 4,
			name: 'Student',
		},
	},
];
