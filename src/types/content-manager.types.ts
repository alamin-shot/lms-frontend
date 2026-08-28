import { Course, Lesson } from './course.types';
import { BlogPost, CMBlogCardProps, CMBlogListProps } from './blog.types';
import { Quiz, Question } from './quiz.types';

// Re-export blog types if needed
export type { CMBlogCardProps, CMBlogListProps };

export interface CMStatsProps {
	courses: Course[];
	blogPosts: BlogPost[];
}

export interface CMCourseCardProps {
	course: Course;
	onDelete?: (courseId: number) => void;
}

export interface CMCourseListProps {
	courses: Course[];
	onDelete?: (courseId: number) => void;
}

export interface ContentManagerDashboardPageProps {
	courses: Course[];
	blogPosts: BlogPost[];
}

export interface CMManageLessonsPageProps {
	course: Course;
}

export interface CMAddLessonPageProps {
	course: Course;
}

export interface CMEditLessonPageProps {
	course: Course;
	lesson: Lesson;
}

export interface CMManageQuizPageProps {
	course: Course;
	quiz?: Quiz | null;
}

export interface CMCreateQuizPageProps {
	course: Course;
}

export interface CMAddQuestionPageProps {
	course: Course;
	quiz: Quiz;
}

export interface CMEditQuestionPageProps {
	course: Course;
	quiz: Quiz;
	question: Question;
}
