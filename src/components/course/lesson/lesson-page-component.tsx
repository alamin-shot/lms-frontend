'use client';

import { LessonPlayer } from './lesson-player';
import { useAuth } from '@/lib/hooks/use-auth';
import { courseService } from '@/services/course.service';
import { enrollmentService } from '@/services/enrollment.service';
import { progressService } from '@/services/progress.service';
import { notFound, redirect } from 'next/navigation';
import { use } from 'react';
import { useEffect, useState } from 'react';
import { Course, Lesson } from '@/types/course.types';
import { LessonPageComponentProps } from '@/types/lesson.types';

export function LessonPageComponent({ params }: LessonPageComponentProps) {
	const { slug, lessonId } = use(params);
	const { isAuthenticated } = useAuth();
	const [loading, setLoading] = useState(true);
	const [course, setCourse] = useState<Course | null>(null);
	const [allLessons, setAllLessons] = useState<Lesson[]>([]);
	const [lesson, setLesson] = useState<Lesson | null>(null);
	const [isCompleted, setIsCompleted] = useState(false);
	const [prevLesson, setPrevLesson] = useState<Lesson | undefined>(undefined);
	const [nextLesson, setNextLesson] = useState<Lesson | undefined>(undefined);

	useEffect(() => {
		const fetchData = async () => {
			// Check if user is logged in
			if (!isAuthenticated) {
				redirect('/login');
			}

			try {
				// Fetch course from backend
				const courseData = await courseService.getBySlug(slug);
				setCourse(courseData);

				const lessons = courseData.lessons || [];
				setAllLessons(lessons);

				// Find the lesson
				const lessonData = lessons.find(
					(l: Lesson) => String(l.id) === lessonId,
				);
				if (!lessonData) {
					notFound();
				}
				setLesson(lessonData);

				// Check if user is enrolled
				const isEnrolled = await enrollmentService.isEnrolled(courseData.id);
				if (!isEnrolled) {
					redirect(`/courses/${slug}`);
				}

				// Check if lesson is completed
				try {
					const progressData = await progressService.getCourseProgress(
						courseData.id,
					);
					const completedIds = progressData.progress
						.filter((p) => p.completed)
						.map((p) => p.lesson.id);
					setIsCompleted(completedIds.includes(lessonData.id));
				} catch {
					// No progress yet
				}

				// Find prev/next lessons
				const currentIndex = lessons.findIndex(
					(l: Lesson) => String(l.id) === String(lessonData.id),
				);
				setPrevLesson(currentIndex > 0 ? lessons[currentIndex - 1] : undefined);
				setNextLesson(
					currentIndex < lessons.length - 1
						? lessons[currentIndex + 1]
						: undefined,
				);

				setLoading(false);
			} catch (error) {
				console.error('Error fetching lesson:', error);
				notFound();
			}
		};

		fetchData();
	}, [slug, lessonId, isAuthenticated]);

	const handleToggleComplete = async () => {
		try {
			const result = await progressService.toggleComplete(parseInt(lessonId));
			setIsCompleted(!isCompleted);
			console.log('Progress updated:', result);
		} catch (error) {
			console.error('Error toggling complete:', error);
		}
	};

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<p className='text-muted-foreground'>Loading lesson...</p>
			</div>
		);
	}

	if (!course || !lesson) {
		notFound();
	}

	return (
		<LessonPlayer
			course={course}
			lesson={lesson}
			allLessons={allLessons}
			isCompleted={isCompleted}
			onToggleComplete={handleToggleComplete}
			nextLesson={nextLesson}
			prevLesson={prevLesson}
		/>
	);
}
