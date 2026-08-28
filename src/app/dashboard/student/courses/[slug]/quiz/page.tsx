import { QuizPage } from '@/components/quiz/quiz-page';
import { quizzes } from '@/mocks/quiz';
import { enrolledCourses } from '@/mocks';
import { notFound } from 'next/navigation';

export default async function QuizPageRoute({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const course = enrolledCourses.find((c) => c.slug === slug);
	if (!course) notFound();

	const quiz = quizzes.find((q) => q.course?.slug === slug);
	if (!quiz) notFound();

	return <QuizPage quiz={quiz} courseSlug={slug} />;
}
