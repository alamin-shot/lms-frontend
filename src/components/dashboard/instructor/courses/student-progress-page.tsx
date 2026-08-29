import { Container } from '@/components/ui/container';
import { StudentProgress } from './student-progress';
import BackButton from '@/components/ui/back-button';
import { StudentProgressPageProps } from '@/types/instructor.types';

export function StudentProgressPage({ course }: StudentProgressPageProps) {
	return (
		<Container className='py-8'>
			<div className='mb-6'>
				<BackButton
					href={`/dashboard/instructor/courses/${course.id}/edit`}
					label='Back to Course'
				/>
			</div>

			<div className='space-y-6'>
				<div>
					<h1 className='text-3xl font-bold'>Student Progress</h1>
					<p className='text-muted-foreground mt-1'>
						{course.title} - Track your students progress
					</p>
				</div>

				<div className='p-6 rounded-xl border border-border/50 bg-card/30'>
					<StudentProgress courseId={course.id} />
				</div>
			</div>
		</Container>
	);
}
