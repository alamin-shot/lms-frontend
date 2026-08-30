'use client';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { CMStats } from './cm-stats';
import { CMCourseList } from '../courses/cm-course-list';
import { CMBlogList } from '../blog/cm-blog-list';
import { ContentManagerDashboardPageProps } from '@/types/content-manager.types';
import { courseService } from '@/services/course.service';
import { blogService } from '@/services/blog.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function ContentManagerDashboardPage({
	courses,
	blogPosts,
}: ContentManagerDashboardPageProps) {
	const router = useRouter();

	const handleDeleteCourse = async (courseId: number) => {
		try {
			await courseService.delete(courseId);
			toast.success('Course deleted successfully!');
			router.refresh();
		} catch (error) {
			console.error('Error deleting course:', error);
			toast.error('Failed to delete course.');
		}
	};

	const handleDeletePost = async (postId: number) => {
		try {
			const post = blogPosts.find((p) => p.id === postId);
			await blogService.delete(postId, post?.documentId);
			toast.success('Blog post deleted successfully!');
			router.refresh();
		} catch (error) {
			console.error('Error deleting blog post:', error);
			toast.error('Failed to delete blog post.');
		}
	};

	const handleTogglePublish = async (postId: number) => {
		try {
			const post = blogPosts.find((p) => p.id === postId);
			if (!post) return;

			const updateData = {
				title: post.title,
				body: post.body,
				coverImage: post.coverImage || '',
				publishDate: post.publishDate ? null : new Date().toISOString(),
			};

			await blogService.update(postId, updateData, post.documentId);
			toast.success(
				updateData.publishDate ? 'Post published!' : 'Post unpublished!'
			);
			router.refresh();
		} catch (error) {
			console.error('Error toggling publish:', error);
			toast.error('Failed to update post status.');
		}
	};

	return (
		<Container className='py-8'>
			<div className='flex items-center justify-between mb-8'>
				<div>
					<h1 className='text-3xl font-bold'>Content Manager Dashboard</h1>
					<p className='text-muted-foreground mt-1'>
						Manage all courses and blog posts
					</p>
				</div>
				<div className='flex gap-2'>
					<Link href='/dashboard/content-manager/courses/create'>
						<Button className='bg-purple-600 hover:bg-purple-700'>
							<Plus className='h-4 w-4 mr-2' /> Create Course
						</Button>
					</Link>
					<Link href='/dashboard/content-manager/blog/create'>
						<Button className='bg-purple-600 hover:bg-purple-700'>
							<Plus className='h-4 w-4 mr-2' /> New Post
						</Button>
					</Link>
				</div>
			</div>

			<CMStats courses={courses} blogPosts={blogPosts} />

			<div className='space-y-12'>
				<div>
					<h2 className='text-2xl font-bold mb-4'>All Courses</h2>
					<CMCourseList courses={courses} onDelete={handleDeleteCourse} />
				</div>

				<div>
					<div className='flex items-center justify-between mb-4'>
						<h2 className='text-2xl font-bold'>Blog Posts</h2>
						<Link href='/dashboard/content-manager/blog/create'>
							<Button variant='outline' className='gap-1'>
								<Plus className='h-4 w-4' /> Create Post
							</Button>
						</Link>
					</div>
					<CMBlogList
						posts={blogPosts}
						onDelete={handleDeletePost}
						onTogglePublish={handleTogglePublish}
					/>
				</div>
			</div>
		</Container>
	);
}