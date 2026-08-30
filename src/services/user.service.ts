import { apiClient } from '@/lib/api/client';
import { User } from '@/types/auth.types';
import { ApiResponse } from '@/types/api.types';

export const userService = {
    // Get all users
    async getAll(token?: string): Promise<User[]> {
        const response = await apiClient.get<ApiResponse<User[]>>(
            '/api/users?populate=role',
            token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
        );
        return response.data.data;
    },
    async getAdminUsers(token?: string): Promise<User[]> {
        const response = await apiClient.get(
            '/api/users?populate=role',
            token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
        );
        // Strapi returns the array directly for /api/users endpoint
        const data = response.data;
        return Array.isArray(data) ? data : [];
    },

    // Update user role
    async updateRole(userId: number, roleId: number, token?: string): Promise<User> {
        const response = await apiClient.put<ApiResponse<User>>(
            `/api/users/${userId}`,
            { data: { role: roleId } },
            token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
        );
        return response.data.data;
    },
};