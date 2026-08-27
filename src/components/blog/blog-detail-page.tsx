import { BlogPost } from '@/types/blog.types';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User } from 'lucide-react';

interface BlogDetailPageProps {
	post: BlogPost;
}

export function BlogDetailPage({ post }: BlogDetailPageProps) {
	return (
		<main className='py-12'>
			<Container>
				{/* Back Button */}
				<Link href='/blog'>
					<Button variant='ghost' className='mb-6 gap-2'>
						<ArrowLeft className='h-4 w-4' /> Back to Blog
					</Button>
				</Link>

				{/* Article */}
				<article className='max-w-3xl mx-auto'>
					{/* Cover Image */}
					{post.coverImage && (
						<div className='aspect-video rounded-xl overflow-hidden bg-muted mb-8'>
							<Image
								src={post.coverImage}
								alt={post.title}
								width={800}
								height={400}
								className='w-full h-full object-cover'
							/>
						</div>
					)}

					{/* Meta */}
					<div className='flex items-center gap-4 text-sm text-muted-foreground mb-4'>
						<Badge className='bg-purple-600/20 text-purple-400 border-purple-500/30'>
							Article
						</Badge>
						<span className='flex items-center gap-1'>
							<Calendar className='h-3 w-3' />
							{post.publishDate
								? new Date(post.publishDate).toLocaleDateString()
								: 'No date'}
						</span>
					</div>

					{/* Title */}
					<h1 className='text-3xl md:text-4xl font-bold mb-6'>{post.title}</h1>

					{/* Body */}
					<div
						className='prose prose-invert max-w-none'
						dangerouslySetInnerHTML={{ __html: post.body }}
					/>
				</article>
			</Container>
		</main>
	);
}
