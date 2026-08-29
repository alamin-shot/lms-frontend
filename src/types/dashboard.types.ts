import { Course, LessonSummary } from './course.types';

export interface DashboardCourse extends Omit<Course, 'lessons'> {
	lessons: LessonSummary[];
	progress: number;
	completedCount: number;
	totalCount: number;
}

export interface StudentDashboardPageProps {
	courses: DashboardCourse[];
}
