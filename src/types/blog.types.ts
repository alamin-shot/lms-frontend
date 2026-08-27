export interface BlogPost {
	id: number;
	documentId: string;
	title: string;
	body: string;
	coverImage?: string;
	publishDate?: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}
