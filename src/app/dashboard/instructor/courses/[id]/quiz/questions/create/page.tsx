import { AddQuestionPage } from '@/components/dashboard/instructor/quiz/add-question-page';
import { courseService } from '@/services/course.service';
import { quizService } from '@/services/quiz.service';
import { Course } from '@/types/course.types';
import { Quiz } from '@/types/quiz.types';
import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function AddQuestionPageRoute({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const token = (await cookies()).get('jwt')?.value;

	let course: Course | null = null;
	try {
		course = await courseService.getById(parseInt(id, 10), token);
	} catch {
		notFound();
	}

	if (!course) {
		notFound();
	}

	let quiz: Quiz | null = null;
	try {
		quiz = await quizService.getQuizByCourse(course.id, token);
	} catch {
		notFound();
	}

	if (!quiz) {
		redirect(`/dashboard/instructor/courses/${course.id}/quiz`);
	}

	return <AddQuestionPage course={course} quiz={quiz} />;
}
