import { BlogPost } from '@/types/blog.types';
import { richTextToPlainText } from './rich-text';

// Type guard to check if an object is a valid BlogPost
const isBlogPost = (item: unknown): item is BlogPost => {
	if (!item || typeof item !== 'object') return false;
	const obj = item as Record<string, unknown>;
	return 'id' in obj && 'title' in obj && 'body' in obj;
};

export const processBlogPost = (post: unknown): BlogPost => {
	if (!isBlogPost(post)) {
		throw new Error('Invalid blog post data');
	}
	return {
		...post,
		body: richTextToPlainText(post.body),
	};
};

export const processBlogPosts = (posts: unknown[]): BlogPost[] => {
	if (!Array.isArray(posts)) return [];
	return posts
		.filter((item): item is BlogPost => isBlogPost(item))
		.map((post) => processBlogPost(post));
};
