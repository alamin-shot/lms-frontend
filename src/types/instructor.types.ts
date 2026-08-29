import { Course, Lesson } from './course.types';
import { Quiz, Question } from './quiz.types';

export interface InstructorStatsProps {
	courses: Course[];
}

export interface InstructorCourseCardProps {
	course: Course;
	onDelete?: (courseId: number) => void;
}

export interface InstructorCourseListProps {
	courses: Course[];
	onDelete?: (courseId: number) => void;
}

export interface InstructorDashboardPageProps {
	courses: Course[];
}

export interface ManageLessonsPageProps {
	course: Course;
	onDeleteLesson?: (lessonId: number) => void;
}

export interface AddLessonPageProps {
	course: Course;
}

export interface EditLessonPageProps {
	course: Course;
	lesson: Lesson;
}

export interface ManageQuizPageProps {
	course: Course;
	quiz?: Quiz | null;
	onDeleteQuiz?: () => void;
}

export interface CreateQuizPageProps {
	course: Course;
}

export interface EditQuizPageProps {
	course: Course;
	quiz: Quiz;
}

export interface ManageQuestionsPageProps {
	course: Course;
	quiz: Quiz;
	onDeleteQuestion?: (questionId: number) => void;
}

export interface AddQuestionPageProps {
	course: Course;
	quiz: Quiz;
}

export interface EditQuestionPageProps {
	course: Course;
	quiz: Quiz;
	question: Question;
}

export interface StudentProgressPageProps {
	course: Course;
}

export interface EditCoursePageProps {
	course: Course;
}

export interface CourseFormProps {
	defaultValues?: Partial<{
		title: string;
		description: string;
		slug: string;
		coverImage?: string;
	}>;
	onSubmit: (data: {
		title: string;
		description: string;
		slug: string;
		coverImage?: string;
	}) => void;
	isLoading?: boolean;
}

export interface LessonFormProps {
	defaultValues?: Partial<{
		title: string;
		content: string;
		videoUrl?: string;
		order: number;
	}>;
	onSubmit: (data: {
		title: string;
		content: string;
		videoUrl?: string;
		order: number;
	}) => void;
	isLoading?: boolean;
}

export interface QuizFormProps {
	defaultValues?: Partial<{
		title: string;
	}>;
	onSubmit: (data: { title: string }) => void;
	isLoading?: boolean;
}

export interface QuestionFormProps {
	defaultValues?: Partial<{
		questionText: string;
		options: string[];
		correctAnswer: string;
	}>;
	onSubmit: (data: {
		questionText: string;
		options: string[];
		correctAnswer: string;
	}) => void;
	isLoading?: boolean;
}

export interface StudentProgressProps {
	courseId: number;
}

export interface StudentData {
	id: number;
	studentName: string;
	studentEmail: string;
	completedLessons: number[];
	totalLessons: number;
}
