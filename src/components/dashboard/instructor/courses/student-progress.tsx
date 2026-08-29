'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { enrollmentService } from '@/services/enrollment.service';
import { progressService } from '@/services/progress.service';
import { StudentData, StudentProgressProps } from '@/types/instructor.types';
import { toast } from 'sonner';

export function StudentProgress({ courseId }: StudentProgressProps) {
	const [students, setStudents] = useState<StudentData[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				// 1. Get all enrollments for this course
				const enrollments = await enrollmentService.getUserEnrollments();
				const courseEnrollments = enrollments.filter(
					(e) => e.course.id === courseId,
				);

				if (courseEnrollments.length === 0) {
					setStudents([]);
					setLoading(false);
					return;
				}

				// 2. Get progress for each student
				const studentData: StudentData[] = await Promise.all(
					courseEnrollments.map(async (enrollment) => {
						const userId = enrollment.user.id;
						const progressData =
							await progressService.getCourseProgress(courseId);
						const userProgress = progressData.progress.filter(
							(p) => p.user.id === userId,
						);
						const completedLessons = userProgress
							.filter((p) => p.completed)
							.map((p) => p.lesson.id);

						const totalLessons = enrollment.course.lessons?.length || 0;

						return {
							id: enrollment.id,
							studentName: enrollment.user.username,
							studentEmail: enrollment.user.email,
							completedLessons,
							totalLessons,
						};
					}),
				);

				setStudents(studentData);
			} catch (error) {
				console.error('Error fetching student progress:', error);
				const message =
					'Student progress is unavailable because Strapi permissions for enrollments/progress are not enabled.';
				toast.error(message);
			} finally {
				setLoading(false);
			}
		};

		fetchStudents();
	}, [courseId]);

	if (loading) {
		return (
			<div className='text-center py-8 text-muted-foreground'>
				Loading student progress...
			</div>
		);
	}

	if (students.length === 0) {
		return (
			<div className='text-center py-8 text-muted-foreground'>
				No students enrolled in this course yet
			</div>
		);
	}

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<h3 className='font-semibold'>Enrolled Students ({students.length})</h3>
			</div>
			<div className='space-y-3'>
				{students.map((student) => {
					const progress =
						student.totalLessons > 0
							? Math.round(
									(student.completedLessons.length / student.totalLessons) *
										100,
								)
							: 0;
					const isComplete = progress === 100;

					return (
						<Card key={student.id} className='overflow-hidden'>
							<CardContent className='p-4'>
								<div className='flex flex-col md:flex-row md:items-center justify-between gap-3'>
									<div className='space-y-1'>
										<div className='flex items-center gap-2'>
											<h4 className='font-medium'>{student.studentName}</h4>
											{isComplete && (
												<Badge className='bg-green-500/20 text-green-500 border-green-500/30'>
													✅ Completed
												</Badge>
											)}
										</div>
										<p className='text-sm text-muted-foreground'>
											{student.studentEmail}
										</p>
									</div>
									<div className='w-full md:w-48 space-y-1'>
										<div className='flex justify-between text-sm'>
											<span className='text-muted-foreground'>Progress</span>
											<span className='font-medium'>{progress}%</span>
										</div>
										<Progress value={progress} className='h-2' />
										<p className='text-xs text-muted-foreground text-right'>
											{student.completedLessons.length} / {student.totalLessons}{' '}
											lessons
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
