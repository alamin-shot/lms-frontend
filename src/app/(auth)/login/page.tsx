import { LoginForm, AuthLayout } from '@/components/auth';

export default function LoginPage() {
	return (
		<AuthLayout title='Welcome Back' subtitle='Login to your account'>
			<LoginForm />
		</AuthLayout>
	);
}
