'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/use-auth';
import { loginSchema, LoginFormData } from '@/lib/validations/auth.schema';
import { LoadingScreen } from '@/components/ui/loading-screen';

export function LoginForm() {
	const { login, isLoading } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		await login(data);
	};

	if (isLoading) {
		return <LoadingScreen message='Logging in...' />;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			<div className='space-y-2'>
				<Label htmlFor='identifier'>Email or Username</Label>
				<Input
					id='identifier'
					type='text'
					placeholder='Enter your email or username'
					{...register('identifier')}
				/>
				{errors.identifier && (
					<p className='text-sm text-red-500'>{errors.identifier.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='password'>Password</Label>
				<Input
					id='password'
					type='password'
					placeholder='Enter your password'
					{...register('password')}
				/>
				{errors.password && (
					<p className='text-sm text-red-500'>{errors.password.message}</p>
				)}
			</div>

			<Button
				type='submit'
				className='w-full bg-purple-600 hover:bg-purple-700'
				disabled={isLoading}
			>
				{isLoading ? 'Logging in...' : 'Login'}
			</Button>

			<p className='text-sm text-center text-muted-foreground'>
				Dont have an account?{' '}
				<Link href='/register' className='text-purple-400 hover:underline'>
					Register
				</Link>
			</p>
		</form>
	);
}
