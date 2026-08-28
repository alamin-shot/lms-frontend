import { BlogPost } from '@/types/blog.types';

export const blogPosts: BlogPost[] = [
	{
		id: 1,
		documentId: 'blog1',
		title: '10 Tips for Learning Programming Faster',
		body: 'Learning programming can be challenging. Here are 10 tips to help you learn faster and more effectively...',
		coverImage: 'https://picsum.photos/800/400',
		publishDate: '2024-01-15',
		createdAt: '2024-01-15',
		updatedAt: '2024-01-15',
		publishedAt: '2024-01-15',
	},
	{
		id: 2,
		documentId: 'blog2',
		title: 'Understanding React Hooks: A Complete Guide',
		body: 'React Hooks revolutionized how we write React components. This guide covers everything you need to know...',
		coverImage: 'https://picsum.photos/800/401',
		publishDate: '2024-02-20',
		createdAt: '2024-02-20',
		updatedAt: '2024-02-20',
		publishedAt: '2024-02-20',
	},
	{
		id: 3,
		documentId: 'blog3',
		title: 'Draft Post - Work in Progress',
		body: 'This is a draft post that is not published yet...',
		coverImage: 'https://picsum.photos/800/402',
		publishDate: null,
		createdAt: '2024-03-10',
		updatedAt: '2024-03-10',
		publishedAt: null,
	},
];
