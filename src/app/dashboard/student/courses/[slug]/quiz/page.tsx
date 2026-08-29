import { QuizPageComponent } from '@/components/quiz/quiz-page-component';
import { courseService } from '@/services/course.service';
import { notFound } from 'next/navigation';

export default async function QuizPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	let course;
	try {
		course = await courseService.getBySlug(slug);
	} catch {
		notFound();
	}

	if (!course) {
		notFound();
	}

	return <QuizPageComponent courseSlug={slug} courseId={course.id} />;
}
