export interface User {
	id: number;
	username: string;
	email: string;
	role: {
		id: number;
		name: 'Admin' | 'Content Manager' | 'Instructor' | 'Student';
		description?: string;
	};
	createdAt?: string;
	updatedAt?: string;
}

export interface AuthState {
	user: User | null;
	token: string | null;
	isLoading: boolean;
	error: string | null;
}

export interface LoginCredentials {
	identifier: string;
	password: string;
}

export interface RegisterData {
	username: string;
	email: string;
	password: string;
	role: 'Student' | 'Instructor' | 'Content Manager';
}

export interface AuthResponse {
	jwt: string;
	user: User;
}
