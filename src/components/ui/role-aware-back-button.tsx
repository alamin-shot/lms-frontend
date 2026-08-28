'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { useAppSelector } from '@/lib/hooks/use-redux';
import { usePathname, useRouter } from 'next/navigation';
import BackButton from './back-button';
interface RoleAwareBackButtonProps {
	label?: string;
	fallbackHref?: string;
}

export function RoleAwareBackButton({
	label = 'Back to Dashboard',
	fallbackHref = '/courses',
}: RoleAwareBackButtonProps) {
	const { user, isAuthenticated } = useAuth();
	const router = useRouter();
	const pathname = usePathname();
	const authState = useAppSelector((state) => state.auth);
	const roleName = getRoleName(user);

	console.log('RoleAwareBackButton auth state:', {
		user,
		isAuthenticated,
		roleName,
	});

	// Role-based dashboard mapping
	const dashboardMap: Record<string, string> = {
		Student: '/dashboard/student',
		Instructor: '/dashboard/instructor',
		'Content Manager': '/dashboard/content-manager',
		Admin: '/dashboard/admin',
	};

	const normalizedRoleName = roleName?.trim();
	const dashboardHref =
		dashboardMap[normalizedRoleName || ''] || '/dashboard/student';
	const currentDashboardPath = pathname.match(
		/^\/(dashboard\/(?:student|instructor|content-manager|admin))/,
	)?.[0];
	const isDashboardCoursePage = Boolean(currentDashboardPath);

	const handleBackClick = () => {
		const liveUser = authState.user;
		const liveIsAuthenticated = !!authState.token && !!liveUser;
		const liveRoleName = getRoleName(liveUser)?.trim();
		const liveDashboardHref =
			dashboardMap[liveRoleName || ''] || '/dashboard/student';
		const destination = liveIsAuthenticated
			? liveDashboardHref
			: currentDashboardPath || fallbackHref;
		const routeDestination = currentDashboardPath || destination;

		console.log('RoleAwareBackButton clicked:', {
			user: liveUser,
			isAuthenticated: liveIsAuthenticated,
			roleName: liveRoleName,
			destination: routeDestination,
		});

		router.push(routeDestination);
	};

	return (
		<BackButton
			href={currentDashboardPath || dashboardHref}
			label={
				isDashboardCoursePage
					? label
					: isAuthenticated && user
						? label
						: 'Back to Courses'
			}
			onClick={handleBackClick}
		/>
	);
}

function getRoleName(user: ReturnType<typeof useAuth>['user']) {
	return typeof user?.role === 'string' ? user.role : user?.role?.name;
}
