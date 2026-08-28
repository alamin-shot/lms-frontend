'use client';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { instructorCourses } from '@/mocks';
import { blogPosts } from '@/mocks/blog-posts';
import { CMStats } from './cm-stats';
import { CMCourseList } from '../courses/cm-course-list';
import { CMBlogList } from '../blog/cm-blog-list';

export function ContentManagerDashboardPage() {
	const courses = instructorCourses;
	const posts = blogPosts;

	const handleDeleteCourse = (courseId: number) => {
		console.log('Delete course:', courseId);
		// TODO: Implement delete
	};

	const handleDeletePost = (postId: number) => {
		console.log('Delete post:', postId);
		// TODO: Implement delete
	};

	const handleTogglePublish = (postId: number) => {
		console.log('Toggle publish:', postId);
		// TODO: Implement toggle publish
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
			</div>

			<CMStats courses={courses} blogPosts={posts} />

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
						posts={posts}
						onDelete={handleDeletePost}
						onTogglePublish={handleTogglePublish}
					/>
				</div>
			</div>
		</Container>
	);
}
