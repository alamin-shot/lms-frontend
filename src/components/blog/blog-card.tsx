import { BlogPost } from '@/types/blog.types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

interface BlogCardProps {
	post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
	return (
		<div className='group rounded-xl border border-border/50 bg-card/50 overflow-hidden hover:-translate-y-2 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20'>
			<div className='aspect-video overflow-hidden bg-muted'>
				{post.coverImage ? (
					<Image
						src={post.coverImage}
						alt={post.title}
						width={800}
						height={400}
						className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center text-muted-foreground'>
						<Calendar className='h-12 w-12' />
					</div>
				)}
			</div>
			<div className='p-5'>
				<Badge className='mb-3 bg-purple-600/20 text-purple-400 border-purple-500/30'>
					Article
				</Badge>
				<h3 className='font-semibold text-xl line-clamp-2 group-hover:text-purple-400 transition-colors'>
					{post.title}
				</h3>
				<div className='flex items-center gap-4 mt-3 text-sm text-muted-foreground'>
					<span className='flex items-center gap-1'>
						<Calendar className='h-3 w-3' />
						{post.publishDate
							? new Date(post.publishDate).toLocaleDateString()
							: 'No date'}
					</span>
				</div>
				<p className='text-muted-foreground mt-3 line-clamp-3'>
					{post.body.replace(/<[^>]*>/g, '').substring(0, 150)}...
				</p>
				<Link href={`/blog/${post.documentId}`}>
					<Button variant='outline' size='sm' className='mt-4 w-full'>
						Read More
					</Button>
				</Link>
			</div>
		</div>
	);
}
