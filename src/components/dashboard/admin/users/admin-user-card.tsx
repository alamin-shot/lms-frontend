'use client';

import { User } from '@/types/auth.types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { AdminUserCardProps } from '@/types/admin.types';

export function AdminUserCard({ user, onRoleChange }: AdminUserCardProps) {
	const [selectedRole, setSelectedRole] = useState<string>(
		user.role?.name || 'Student'
	);

	const roles = ['Student', 'Instructor', 'Content Manager', 'Admin'];

	const handleRoleChange = (value: string | null) => {
		if (!value) return;
		setSelectedRole(value);
		onRoleChange?.(user.id, value);
	};

	return (
		<Card>
			<CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div className="space-y-1">
					<div className="flex items-center gap-2">
						<h3 className="font-medium">{user.username}</h3>
						<Badge variant="outline">ID: {user.id}</Badge>
					</div>
					<p className="text-sm text-muted-foreground">{user.email}</p>
				</div>
				<div className="flex items-center gap-4">
					<Select value={selectedRole} onValueChange={handleRoleChange}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select role" />
						</SelectTrigger>
						<SelectContent>
							{roles.map((role) => (
								<SelectItem key={role} value={role}>
									{role}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</Card>
	);
}