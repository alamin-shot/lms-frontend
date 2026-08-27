'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/use-auth';
import {
	registerSchema,
	RegisterFormData,
} from '@/lib/validations/auth.schema';
import { RegisterData } from '@/types/auth.types';
import { LoadingScreen } from '@/components/ui/loading-screen';

export function RegisterForm() {
	const { register: registerUser, isLoading } = useAuth();

	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			role: 'Student',
		},
	});

	const selectedRole = useWatch({ control, name: 'role' });

	const onSubmit = async (data: RegisterFormData) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { confirmPassword, ...registerData } = data;
		await registerUser(registerData as RegisterData);
	};

	if (isLoading) {
		return <LoadingScreen message='Creating your account...' />;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<div className='space-y-2'>
				<Label htmlFor='username'>Username</Label>
				<Input
					id='username'
					type='text'
					placeholder='Choose a username'
					{...register('username')}
				/>
				{errors.username && (
					<p className='text-sm text-red-500'>{errors.username.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='email'>Email</Label>
				<Input
					id='email'
					type='email'
					placeholder='Enter your email'
					{...register('email')}
				/>
				{errors.email && (
					<p className='text-sm text-red-500'>{errors.email.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='password'>Password</Label>
				<Input
					id='password'
					type='password'
					placeholder='Create a password'
					{...register('password')}
				/>
				{errors.password && (
					<p className='text-sm text-red-500'>{errors.password.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='confirmPassword'>Confirm Password</Label>
				<Input
					id='confirmPassword'
					type='password'
					placeholder='Confirm your password'
					{...register('confirmPassword')}
				/>
				{errors.confirmPassword && (
					<p className='text-sm text-red-500'>
						{errors.confirmPassword.message}
					</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='role'>I want to join as</Label>
				<Select
					value={selectedRole}
					onValueChange={(value) =>
						setValue(
							'role',
							value as 'Student' | 'Instructor' | 'Content Manager',
						)
					}
				>
					<SelectTrigger>
						<SelectValue placeholder='Select your role' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='Student'>Student</SelectItem>
						<SelectItem value='Instructor'>Instructor</SelectItem>
						<SelectItem value='Content Manager'>Content Manager</SelectItem>
					</SelectContent>
				</Select>
				{errors.role && (
					<p className='text-sm text-red-500'>{errors.role.message}</p>
				)}
			</div>

			<Button
				type='submit'
				className='w-full bg-purple-600 hover:bg-purple-700'
				disabled={isLoading}
			>
				{isLoading ? 'Creating account...' : 'Create Account'}
			</Button>

			<p className='text-sm text-center text-muted-foreground'>
				Already have an account?{' '}
				<Link href='/login' className='text-purple-400 hover:underline'>
					Login
				</Link>
			</p>
		</form>
	);
}
