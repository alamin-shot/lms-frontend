import { EditQuizPage } from '@/components/dashboard/instructor/quiz/edit-quiz-page';
import { instructorCourses } from '@/mocks';
import { quizzes } from '@/mocks/quiz';
import { notFound } from 'next/navigation';

export default async function EditQuizPageRoute({
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

	return <EditQuizPage course={course} quiz={quiz} />;
}
