import { CMEditQuestionPage } from '@/components/dashboard/content-manager/question/edit-question-page';
import { instructorCourses } from '@/mocks';
import { quizzes } from '@/mocks/quiz';
import { notFound } from 'next/navigation';

export default async function Page({
	params,
}: {
	params: Promise<{ id: string; questionId: string }>;
}) {
	const { id, questionId } = await params;
	const course = instructorCourses.find((c) => c.id === parseInt(id));

	if (!course) {
		notFound();
	}

	const quiz = quizzes.find((q) => q.course?.id === course.id);
	if (!quiz) {
		notFound();
	}

	const question = quiz.questions?.find((q) => q.id === parseInt(questionId));
	if (!question) {
		notFound();
	}

	return <CMEditQuestionPage course={course} quiz={quiz} question={question} />;
}
