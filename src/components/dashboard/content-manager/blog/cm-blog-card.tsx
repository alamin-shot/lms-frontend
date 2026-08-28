'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { DeleteConfirmationModal } from '@/components/ui/delete-confirmation-modal';
import { CMBlogCardProps } from '@/types/content-manager.types';

export function CMBlogCard({
	post,
	onDelete,
	onTogglePublish,
}: CMBlogCardProps) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const isPublished = post.publishedAt !== null;

	return (
		<>
			<Card className='overflow-hidden'>
				<CardContent className='p-4'>
					<div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
						<div className='space-y-1'>
							<div className='flex items-center gap-2'>
								<h3 className='font-semibold'>{post.title}</h3>
								<Badge variant={isPublished ? 'default' : 'outline'}>
									{isPublished ? '✅ Published' : '📝 Draft'}
								</Badge>
							</div>
							<p className='text-sm text-muted-foreground line-clamp-2'>
								{post.body.replace(/<[^>]*>/g, '').substring(0, 150)}...
							</p>
							<p className='text-xs text-muted-foreground'>
								{post.publishDate
									? new Date(post.publishDate).toLocaleDateString()
									: 'Not published'}
							</p>
						</div>
						<div className='flex flex-wrap gap-2'>
							<Button
								variant='outline'
								size='sm'
								className='gap-1'
								onClick={() => onTogglePublish?.(post.id)}
							>
								{isPublished ? (
									<EyeOff className='h-3 w-3' />
								) : (
									<Eye className='h-3 w-3' />
								)}
								{isPublished ? 'Unpublish' : 'Publish'}
							</Button>
							<Link href={`/dashboard/content-manager/blog/${post.id}/edit`}>
								<Button variant='outline' size='sm' className='gap-1'>
									<Edit className='h-3 w-3' /> Edit
								</Button>
							</Link>
							<Button
								variant='outline'
								size='sm'
								className='gap-1 text-red-500 hover:text-red-600 hover:bg-red-500/10'
								onClick={() => setShowDeleteModal(true)}
							>
								<Trash2 className='h-3 w-3' />
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			<DeleteConfirmationModal
				isOpen={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onConfirm={() => onDelete?.(post.id)}
				title='Delete Blog Post'
				description={`Are you sure you want to delete "${post.title}"? This action cannot be undone.`}
			/>
		</>
	);
}
