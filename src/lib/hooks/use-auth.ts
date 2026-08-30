'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks/use-redux';
import { login, register, logout } from '@/lib/store/slices/auth-slice';
import { LoginCredentials, RegisterData } from '@/types/auth.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useAuth() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { user, token, isLoading, error } = useAppSelector(
		(state) => state.auth,
	);

	const handleLogin = async (credentials: LoginCredentials) => {
		const result = await dispatch(login(credentials));
		console.log('Full result:', result);
		console.log('Payload:', result.payload);
		if (login.fulfilled.match(result)) {
			toast.success('Login successful!');
			const roleName = result.payload.user.role?.name || 'Student';
			const dashboardMap: Record<string, string> = {
				Student: '/dashboard/student',
				Instructor: '/dashboard/instructor',
				'Content Manager': '/dashboard/content-manager',
				Admin: '/dashboard/admin',
			};
			const dashboardPath = dashboardMap[roleName];
			const token = result.payload.jwt;

			// ✅ STORE TOKEN IN SESSION STORAGE BEFORE NAVIGATION
			if (typeof window !== 'undefined') {
				sessionStorage.setItem('auth_token', token);
			}

			console.log('Login succeeded, navigating to:', dashboardPath);
			console.log('Token stored in sessionStorage:', token);

			// Pass token as query parameter AND rely on sessionStorage
			window.location.href = `${dashboardPath}?token=${encodeURIComponent(token)}`;
			return true;
		} else {
			toast.error((result.payload as string) || 'Login failed');
			return false;
		}
	};

	const handleRegister = async (data: RegisterData) => {
		const result = await dispatch(register(data));
		if (register.fulfilled.match(result)) {
			toast.success('Registration successful! You are now logged in.');
			const roleName = result.payload.user.role?.name || 'Student';
			const dashboardMap: Record<string, string> = {
				Student: '/dashboard/student',
				Instructor: '/dashboard/instructor',
				'Content Manager': '/dashboard/content-manager',
				Admin: '/dashboard/admin',
			};
			const dashboardPath = dashboardMap[roleName] || '/dashboard/student';
			const token = result.payload.jwt;

			if (typeof window !== 'undefined') {
				sessionStorage.setItem('auth_token', token);
			}

			window.location.href = `${dashboardPath}?token=${encodeURIComponent(token)}`;
			return true;
		} else {
			toast.error((result.payload as string) || 'Registration failed');
			return false;
		}
	};

	const handleLogout = () => {
		dispatch(logout());
		if (typeof window !== 'undefined') {
			sessionStorage.removeItem('auth_token');
		}
		window.location.href = '/login';
		toast.success('Logged out successfully');
	};

	return {
		user,
		token,
		isLoading,
		error,
		isAuthenticated: !!token && !!user,
		login: handleLogin,
		register: handleRegister,
		logout: handleLogout,
	};
}
