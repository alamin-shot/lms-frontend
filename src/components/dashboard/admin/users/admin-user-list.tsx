import { User } from '@/types/auth.types';
import { AdminUserCard } from './admin-user-card';
import { AdminUserListProps } from '@/types/admin.types';

export function AdminUserList({ users, onRoleChange }: AdminUserListProps) {
	if (users.length === 0) {
		return (
			<div className='text-center py-12 border border-border/50 rounded-xl'>
				<p className='text-muted-foreground'>No users found</p>
			</div>
		);
	}

	return (
		<div className='space-y-3'>
			{users.map((user) => (
				<AdminUserCard key={user.id} user={user} onRoleChange={onRoleChange} />
			))}
		</div>
	);
}
