export interface StudentProgress {
	id: number;
	studentId: number;
	studentName: string;
	studentEmail: string;
	courseId: number;
	completedLessons: number[];
	totalLessons: number;
}

export const studentProgressData: StudentProgress[] = [
	{
		id: 1,
		studentId: 1,
		studentName: 'Alice Johnson',
		studentEmail: 'alice@example.com',
		courseId: 1,
		completedLessons: [1, 2],
		totalLessons: 3,
	},
	{
		id: 2,
		studentId: 2,
		studentName: 'Bob Smith',
		studentEmail: 'bob@example.com',
		courseId: 1,
		completedLessons: [1],
		totalLessons: 3,
	},
	{
		id: 3,
		studentId: 3,
		studentName: 'Charlie Brown',
		studentEmail: 'charlie@example.com',
		courseId: 2,
		completedLessons: [4, 5],
		totalLessons: 5,
	},
	{
		id: 4,
		studentId: 4,
		studentName: 'Diana Prince',
		studentEmail: 'diana@example.com',
		courseId: 1,
		completedLessons: [1, 2, 3],
		totalLessons: 3,
	},
];

export const getStudentsForCourse = (courseId: number) => {
	return studentProgressData.filter((s) => s.courseId === courseId);
};

export const getProgressPercentage = (completed: number[], total: number) => {
	return total > 0 ? Math.round((completed.length / total) * 100) : 0;
};
