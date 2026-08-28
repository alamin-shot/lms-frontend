export interface BlogPost {
	id: number;
	documentId: string;
	title: string;
	body: string;
	coverImage?: string;
	publishDate?: string | null;
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
}

export interface BlogFormData {
	title: string;
	body: string;
	coverImage?: string;
	publishDate?: string;
}

export interface BlogFormProps {
	defaultValues?: Partial<BlogFormData>;
	onSubmit: (data: BlogFormData) => void;
	isLoading?: boolean;
}

export interface EditBlogPageProps {
	post: BlogPost;
}



export interface CMBlogCardProps {
	post: BlogPost;
	onDelete?: (postId: number) => void;
	onTogglePublish?: (postId: number) => void;
}

export interface CMBlogListProps {
	posts: BlogPost[];
	onDelete?: (postId: number) => void;
	onTogglePublish?: (postId: number) => void;
}
