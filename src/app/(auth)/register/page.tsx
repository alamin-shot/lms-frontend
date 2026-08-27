import { RegisterForm, AuthLayout } from '@/components/auth';

export default function RegisterPage() {
	return (
		<AuthLayout
			title='Create Account'
			subtitle='Join thousands of students and instructors'
		>
			<RegisterForm />
		</AuthLayout>
	);
}
