export interface UserProgress {
	courseId: number;
	completedLessonIds: number[];
}

export const userProgress: UserProgress[] = [
	{
		courseId: 1, // Web Development Bootcamp
		completedLessonIds: [1, 2], // Completed HTML Basics & CSS Fundamentals
	},
	{
		courseId: 2, // Python for Data Science
		completedLessonIds: [4], // Completed Python Basics only
	},
];

// Helper function to get progress for a specific course
export const getProgressForCourse = (
	courseId: number,
): UserProgress | undefined => {
	return userProgress.find((p) => p.courseId === courseId);
};

// Helper function to calculate percentage
export const getProgressPercentage = (
	courseId: number,
	totalLessons: number,
): number => {
	const progress = getProgressForCourse(courseId);
	if (!progress) return 0;
	return Math.round((progress.completedLessonIds.length / totalLessons) * 100);
};
