import { CreateQuizPage } from '@/components/dashboard/instructor/quiz/create-quiz-page';
import { instructorCourses } from '@/mocks';
import { notFound } from 'next/navigation';

export default async function CreateQuizPageRoute({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const course = instructorCourses.find((c) => c.id === parseInt(id));

	if (!course) {
		notFound();
	}

	return <CreateQuizPage course={course} />;
}
