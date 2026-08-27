import { Container } from '@/components/ui/container';
import { BlogList } from './blog-list';
import { BlogPost } from '@/types/blog.types';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BlogSectionProps {
	posts: BlogPost[];
	title?: string;
	description?: string;
}

export function BlogSection({
	posts,
	title = 'Blog',
	description = 'Latest articles and insights from our team',
}: BlogSectionProps) {
	return (
		<main className='min-h-screen py-12'>
			<Container>
				{/* Header */}
				<div className='mb-10'>
					<h1 className='text-4xl font-bold'>{title}</h1>
					<p className='text-muted-foreground mt-2'>{description}</p>
				</div>

				{/* Blog Grid */}
				<BlogList posts={posts} />
			</Container>
		</main>
	);
}
