import { LessonPageComponent } from '@/components/course/lesson/lesson-page-component';

export default function LessonPage({
	params,
}: {
	params: Promise<{ slug: string; lessonId: string }>;
}) {
	return <LessonPageComponent params={params} />;
}
