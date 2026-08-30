import { CMManageQuestionsPage } from '@/components/dashboard/content-manager/question/manage-questions-page';
import { courseService } from '@/services/course.service';
import { quizService } from '@/services/quiz.service';
import { Course } from '@/types/course.types';
import { Quiz } from '@/types/quiz.types';
import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Page({
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
        redirect(`/dashboard/content-manager/courses/${course.id}/quiz`);
    }

    return <CMManageQuestionsPage course={course} quiz={quiz} />;
}