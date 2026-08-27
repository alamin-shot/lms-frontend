import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
	AuthState,
	User,
	LoginCredentials,
	RegisterData,
	AuthResponse,
} from '@/types/auth.types';
import { apiClient } from '@/lib/api/client';
import { ApiErrorResponse } from '@/types/api.types';

const initialState: AuthState = {
	user: null,
	token: typeof window !== 'undefined' ? localStorage.getItem('jwt') : null,
	isLoading: false,
	error: null,
};

// Login Thunk
export const login = createAsyncThunk(
	'auth/login',
	async (credentials: LoginCredentials, { rejectWithValue }) => {
		try {
			const response = await apiClient.post<AuthResponse>('/api/auth/local', {
				identifier: credentials.identifier,
				password: credentials.password,
			});
			return response.data;
		} catch (error: unknown) {
			return rejectWithValue(
				(error as ApiErrorResponse).error.message || 'Login failed',
			);
		}
	},
);

// Register Thunk
export const register = createAsyncThunk(
	'auth/register',
	async (data: RegisterData, { rejectWithValue }) => {
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
			return response.data;
		} catch (error: unknown) {
			return rejectWithValue(
				(error as ApiErrorResponse).error.message || 'Registration failed',
			);
		}
	},
);

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
				}
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
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
				}
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
