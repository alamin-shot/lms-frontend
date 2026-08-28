import { EditQuestionPage } from '@/components/dashboard/instructor/quiz/edit-question-page';
import { instructorCourses } from '@/mocks';
import { quizzes } from '@/mocks/quiz';
import { notFound } from 'next/navigation';

export default async function EditQuestionPageRoute({
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

	return <EditQuestionPage course={course} quiz={quiz} question={question} />;
}
