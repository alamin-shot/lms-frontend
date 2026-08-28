import { enrolledCourses } from '@/mocks';

export const isUserEnrolled = (userId: number, courseSlug: string): boolean => {
	return enrolledCourses.some((course) => course.slug === courseSlug);
};

export const checkEnrollmentFromAPI = async (
	userId: number,
	courseSlug: string,
): Promise<boolean> => {
	return true;
};
