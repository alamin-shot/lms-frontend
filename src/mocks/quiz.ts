import { Quiz } from '@/types/quiz.types';

export const quizzes: Quiz[] = [
	{
		id: 1,
		documentId: 'quiz1',
		title: 'Web Development Basics Quiz',
		course: {
			id: 1,
			documentId: 'course1',
			title: 'Complete Web Development Bootcamp',
			slug: 'web-development-bootcamp',
			description: 'Learn HTML, CSS, JavaScript, React, Node.js from scratch',
			createdAt: '2024-01-01',
			updatedAt: '2024-01-01',
			publishedAt: '2024-01-01',
		},
		questions: [
			{
				id: 1,
				documentId: 'q1',
				questionText: 'What does HTML stand for?',
				options: [
					'Hyper Text Markup Language',
					'High Tech Modern Language',
					'Hyper Transfer Markup Language',
					'Home Tool Markup Language',
				],
				correctAnswer: 'Hyper Text Markup Language',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
				publishedAt: '2024-01-01',
			},
			{
				id: 2,
				documentId: 'q2',
				questionText:
					'What is the correct way to create a function in JavaScript?',
				options: [
					'function = myFunction() {}',
					'function myFunction() {}',
					'function:myFunction() {}',
					'myFunction = function() {}',
				],
				correctAnswer: 'function myFunction() {}',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
				publishedAt: '2024-01-01',
			},
			{
				id: 3,
				documentId: 'q3',
				questionText: 'Which CSS property is used to change the text color?',
				options: ['text-color', 'font-color', 'color', 'text-style'],
				correctAnswer: 'color',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
				publishedAt: '2024-01-01',
			},
		],
		createdAt: '2024-01-01',
		updatedAt: '2024-01-01',
		publishedAt: '2024-01-01',
	},
];
