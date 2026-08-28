import { CMAddQuestionPage } from '@/components/dashboard/content-manager/question/add-question-page';
import { instructorCourses } from '@/mocks';
import { quizzes } from '@/mocks/quiz';
import { notFound } from 'next/navigation';

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const course = instructorCourses.find((c) => c.id === parseInt(id));

	if (!course) {
		notFound();
	}

	const quiz = quizzes.find((q) => q.course?.id === course.id);
	if (!quiz) {
		notFound();
	}

	return <CMAddQuestionPage course={course} quiz={quiz} />;
}
