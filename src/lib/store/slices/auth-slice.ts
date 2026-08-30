import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
	AuthState,
	User,
	LoginCredentials,
	RegisterData,
	AuthResponse,
} from '@/types/auth.types';
import { apiClient } from '@/lib/api/client';
import { AxiosError } from 'axios';

interface ApiErrorResponse {
	error: { message: string };
}

const initialState: AuthState = {
	user: null,
	token: typeof window !== 'undefined' ? localStorage.getItem('jwt') : null,
	isLoading: false,
	error: null,
};

// Login Thunk
export const login = createAsyncThunk<
	{ jwt: string; user: User },
	LoginCredentials,
	{ rejectValue: string }
>('auth/login', async (credentials: LoginCredentials, { rejectWithValue }) => {
	try {
		const response = await apiClient.post<AuthResponse>('/api/auth/local', {
			identifier: credentials.identifier,
			password: credentials.password,
		});

		const userResponse = await apiClient.get(
			'/api/users/me?populate[role]=true',
			{
				headers: { Authorization: `Bearer ${response.data.jwt}` },
			},
		);

		return {
			jwt: response.data.jwt,
			user: userResponse.data,
		};
	} catch (error) {
		const err = error as AxiosError<ApiErrorResponse>;
		return rejectWithValue(
			err.response?.data?.error?.message || 'Login failed',
		);
	}
});

// Register Thunk
export const register = createAsyncThunk<
	AuthResponse,
	RegisterData,
	{ rejectValue: string }
>('auth/register', async (data: RegisterData, { rejectWithValue }) => {
	try {
		const response = await apiClient.post<AuthResponse>(
			'/api/registration/register',
			{
				username: data.username,
				email: data.email,
				password: data.password,
				role: data.role,
			},
		);
		const userResponse = await apiClient.get<User>(
			'/api/users/me?populate[role]=true',
			{
				headers: { Authorization: `Bearer ${response.data.jwt}` },
			},
		);
		return { jwt: response.data.jwt, user: userResponse.data };
	} catch (error) {
		const err = error as AxiosError<ApiErrorResponse>;
		return rejectWithValue(
			err.response?.data?.error?.message || 'Registration failed',
		);
	}
});

export const restoreUser = createAsyncThunk<
	User,
	void,
	{ rejectValue: string }
>('auth/restoreUser', async (_, { rejectWithValue }) => {
	try {
		const token = localStorage.getItem('jwt');
		if (!token) {
			return rejectWithValue('No stored session');
		}

		const response = await apiClient.get<User>(
			'/api/users/me?populate[role]=true',
		);
		document.cookie = `jwt=${encodeURIComponent(token)}; Path=/; Secure; SameSite=Lax`;
		document.cookie = `userRole=${encodeURIComponent(response.data.role.name)}; Path=/; Secure; SameSite=Lax`;
		return response.data;
	} catch (error) {
		const err = error as AxiosError<ApiErrorResponse>;
		return rejectWithValue(
			err.response?.data?.error?.message || 'Session restore failed',
		);
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.error = null;
			if (typeof window !== 'undefined') {
				localStorage.removeItem('jwt');
				document.cookie = 'jwt=; Path=/; Max-Age=0; Secure; SameSite=Lax';
				document.cookie = 'userRole=; Path=/; Max-Age=0; Secure; SameSite=Lax';
			}
		},
		clearError: (state) => {
			state.error = null;
		},
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Login
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.token = action.payload.jwt;
				if (typeof window !== 'undefined') {
					localStorage.setItem('jwt', action.payload.jwt);
					document.cookie = `jwt=${encodeURIComponent(action.payload.jwt)}; Path=/; Secure; SameSite=Lax`;
					document.cookie = `userRole=${encodeURIComponent(action.payload.user.role.name)}; Path=/; Secure; SameSite=Lax`;
				}
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || 'Login failed';
			})
			// Register
			.addCase(register.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.token = action.payload.jwt;
				if (typeof window !== 'undefined') {
					localStorage.setItem('jwt', action.payload.jwt);
					document.cookie = `jwt=${encodeURIComponent(action.payload.jwt)}; Path=/; Secure; SameSite=Lax`;
					document.cookie = `userRole=${encodeURIComponent(action.payload.user.role.name)}; Path=/; Secure; SameSite=Lax`;
				}
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || 'Registration failed';
			})
			.addCase(restoreUser.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(restoreUser.rejected, (state) => {
				state.user = null;
			});
	},
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;