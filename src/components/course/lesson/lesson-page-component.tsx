'use client';

import { LessonPlayer } from './lesson-player';
import { useAuth } from '@/lib/hooks/use-auth';
import { enrolledCourses } from '@/mocks';
import { notFound, redirect } from 'next/navigation';
import { use } from 'react';

interface LessonPageComponentProps {
	params: Promise<{ slug: string; lessonId: string }>;
}

export function LessonPageComponent({ params }: LessonPageComponentProps) {
	const { slug, lessonId } = use(params);
	const { user, isAuthenticated } = useAuth();

	// Check if user is logged in
	if (!isAuthenticated) {
		redirect('/login');
	}

	// Check if user is enrolled in this course
	const isEnrolled = enrolledCourses.some((course) => course.slug === slug);
	if (!isEnrolled) {
		redirect(`/courses/${slug}`);
	}

	const course = enrolledCourses.find((c) => c.slug === slug);
	if (!course) notFound();

	const allLessons = course.lessons || [];
	const lesson = allLessons.find((l) => l.id === parseInt(lessonId));
	if (!lesson) notFound();

	const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
	const prevLesson =
		currentIndex > 0 ? allLessons[currentIndex - 1] : undefined;
	const nextLesson =
		currentIndex < allLessons.length - 1
			? allLessons[currentIndex + 1]
			: undefined;

	const handleToggleComplete = () => {
		console.log('Toggle complete for lesson', lesson.id);
	};

	// Mock completed lessons
	const completedLessonIds: number[] = [1, 2];
	const isCompleted = completedLessonIds.includes(lesson.id);

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
