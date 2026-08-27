import { BlogPost } from '@/types/blog.types';
import { BlogCard } from './blog-card';

interface BlogListProps {
	posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
	if (posts.length === 0) {
		return (
			<div className='text-center py-16'>
				<h3 className='text-lg font-semibold'>No blog posts found</h3>
				<p className='text-muted-foreground'>
					Check back later for new content
				</p>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
			{posts.map((post) => (
				<BlogCard key={post.id} post={post} />
			))}
		</div>
	);
}
