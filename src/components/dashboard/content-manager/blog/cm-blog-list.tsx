import { CMBlogCard } from './cm-blog-card';
import { CMBlogListProps } from '@/types/content-manager.types';

export function CMBlogList({
	posts,
	onDelete,
	onTogglePublish,
}: CMBlogListProps) {
	if (posts.length === 0) {
		return (
			<div className='text-center py-12 border border-border/50 rounded-xl'>
				<p className='text-muted-foreground'>No blog posts yet</p>
			</div>
		);
	}

	return (
		<div className='space-y-3'>
			{posts.map((post) => (
				<CMBlogCard
					key={post.id}
					post={post}
					onDelete={onDelete}
					onTogglePublish={onTogglePublish}
				/>
			))}
		</div>
	);
}
