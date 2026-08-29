import { EditQuestionPage } from '@/components/dashboard/instructor/quiz/edit-question-page';
import { courseService } from '@/services/course.service';
import { quizService } from '@/services/quiz.service';
import { questionService } from '@/services/question.service';
import { Course } from '@/types/course.types';
import { Quiz, Question } from '@/types/quiz.types';
import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function EditQuestionPageRoute({
	params,
}: {
	params: Promise<{ id: string; questionId: string }>;
}) {
	const { id, questionId } = await params;
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

	let question: Question | null = null;
	try {
		question = await questionService.getById(parseInt(questionId, 10), token);
	} catch {
		notFound();
	}

	if (!question) {
		notFound();
	}

	return <EditQuestionPage course={course} quiz={quiz} question={question} />;
}
