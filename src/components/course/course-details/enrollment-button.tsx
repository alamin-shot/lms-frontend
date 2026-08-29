'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { enrollmentService } from '@/services/enrollment.service';
import { toast } from 'sonner';
import { useAuth } from '@/lib/hooks/use-auth';
import { useRouter } from 'next/navigation';

interface EnrollmentButtonProps {
	courseId: number;
	isEnrolled: boolean;
	onEnroll?: () => void;
}

export function EnrollmentButton({
	courseId,
	isEnrolled,
	onEnroll,
}: EnrollmentButtonProps) {
	const { isAuthenticated } = useAuth();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [enrolled, setEnrolled] = useState(isEnrolled);

	const handleEnroll = async () => {
		// Check if user is logged in
		if (!isAuthenticated) {
			toast.error('Please login to enroll in this course');
			router.push('/login');
			return;
		}

		setLoading(true);
		try {
			await enrollmentService.enroll(courseId);
			setEnrolled(true);
			toast.success('Successfully enrolled in the course!');
			onEnroll?.();
		} catch (error) {
			toast.error('Failed to enroll. Please try again.');
			console.error('Enrollment error:', error);
		} finally {
			setLoading(false);
		}
	};

	if (enrolled) {
		return (
			<Button variant='outline' className='w-full md:w-auto' disabled>
				✅ Enrolled
			</Button>
		);
	}

	return (
		<Button
			className='w-full md:w-auto bg-purple-600 hover:bg-purple-700'
			onClick={handleEnroll}
			disabled={loading}
		>
			{loading ? 'Enrolling...' : 'Enroll Now'}
		</Button>
	);
}
