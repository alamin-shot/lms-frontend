import { User } from './auth.types';
import { Course } from './course.types';

export interface Quiz {
	id: number;
	documentId: string;
	title: string;
	course?: Course;
	questions?: Question[];
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface Question {
	id: number;
	documentId: string;
	questionText: string;
	options: string[];
	correctAnswer: string;
	quiz?: Quiz;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface QuizAttempt {
	id: number;
	documentId: string;
	score: number;
	answers: string[];
	results: QuizResult[];
	user: User;
	quiz: Quiz;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface QuizResult {
	questionId: number;
	userAnswer: string;
	correctAnswer: string;
	isCorrect: boolean;
}

export interface SubmitQuizRequest {
	quizId: number;
	answers: string[];
}

export interface SubmitQuizResponse {
	id: number;
	score: number;
	correctCount: number;
	totalQuestions: number;
	results: QuizResult[];
	passed: boolean;
}

// Add to existing quiz.types.ts:

export interface QuizTakerProps {
	quiz: Quiz;
	onComplete?: (score: number, answers: string[]) => void;
}

export interface QuizResult {
	questionId: number;
	userAnswer: string;
	isCorrect: boolean;
	correctAnswer: string;
}

export interface QuizPageProps {
	quiz: Quiz;
	courseSlug: string;
}

export interface QuizAttempt {
	id: number;
	documentId: string;
	score: number;
	answers: string[];
	results: QuizResult[];
	user: User;
	quiz: Quiz;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface SubmitQuizRequest {
	quizId: number;
	answers: string[];
}

export interface SubmitQuizResponse {
	id: number;
	score: number;
	correctCount: number;
	totalQuestions: number;
	results: QuizResult[];
	passed: boolean;
}
