import { Course } from '@/types/course.types';
import { richTextToPlainText } from './rich-text';

const normalizeLessons = (lessons: unknown): Course['lessons'] => {
	if (Array.isArray(lessons)) return lessons;
	if (lessons && typeof lessons === 'object') {
		const relation = lessons as { data?: unknown };
		return Array.isArray(relation.data) ? relation.data : [];
	}
	return [];
};

// Type guard to check if an object is a valid Course
const isCourse = (item: unknown): item is Course => {
	if (!item || typeof item !== 'object') return false;
	const obj = item as Record<string, unknown>;
	return 'id' in obj && 'title' in obj && 'slug' in obj && 'description' in obj;
};

export const processCourse = (course: unknown): Course => {
	if (!isCourse(course)) {
		throw new Error('Invalid course data');
	}
	return {
		...course,
		description: richTextToPlainText(course.description),
		lessons: normalizeLessons(course.lessons),
	};
};

export const processCourses = (courses: unknown[]): Course[] => {
	if (!Array.isArray(courses)) return [];
	return courses
		.filter((item): item is Course => isCourse(item))
		.map((course) => processCourse(course));
};
