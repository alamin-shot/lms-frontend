import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ============================================================
// JWT DECODING HELPER
// ============================================================
function decodeJWT(token: string) {
	try {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
				.join(''),
		);
		return JSON.parse(jsonPayload);
	} catch {
		return null;
	}
}

// ============================================================
// MAIN PROXY FUNCTION
// ============================================================
export function proxy(request: NextRequest) {
	const token = request.cookies.get('jwt')?.value;
	const { pathname } = request.nextUrl;

	// ============================================================
	// 1. PUBLIC ROUTES (no auth required)
	// ============================================================
	const publicRoutes = ['/', '/courses', '/blog', '/login', '/register'];
	const isPublicRoute = publicRoutes.some(
		(route) =>
			pathname === route ||
			pathname.startsWith('/courses/') ||
			pathname.startsWith('/blog/'),
	);

	// ============================================================
	// 2. DASHBOARD ROUTES (auth required)
	// ============================================================
	const isDashboardRoute = pathname.startsWith('/dashboard');

	// ============================================================
	// 3. AUTH PAGES (redirect if already logged in)
	// ============================================================
	const isAuthPage = pathname === '/login' || pathname === '/register';

	// ============================================================
	// 4. PROTECT DASHBOARD ROUTES
	// ============================================================
	if (isDashboardRoute && !token) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// ============================================================
	// 5. REDIRECT LOGGED-IN USERS AWAY FROM AUTH PAGES
	// ============================================================
	if (token && isAuthPage) {
		// Decode token to get role for proper redirect
		const payload = decodeJWT(token);
		const role = payload?.role || 'Student';
		const dashboardMap: Record<string, string> = {
			Student: '/dashboard/student',
			Instructor: '/dashboard/instructor',
			'Content Manager': '/dashboard/content-manager',
			Admin: '/dashboard/admin',
		};
		const redirectPath = dashboardMap[role] || '/dashboard/student';
		return NextResponse.redirect(new URL(redirectPath, request.url));
	}

	// ============================================================
	// 6. ROLE-BASED ACCESS FOR DASHBOARDS
	// ============================================================
	if (isDashboardRoute && token) {
		// Decode JWT to get role
		const payload = decodeJWT(token);
		const role = payload?.role || 'Student';

		const roleDashboardMap: Record<string, string[]> = {
			Student: ['/dashboard/student'],
			Instructor: ['/dashboard/instructor'],
			'Content Manager': ['/dashboard/content-manager'],
			Admin: ['/dashboard/admin'],
		};

		// Check if user has access to this dashboard
		const allowedDashboards = roleDashboardMap[role] || [];
		const hasAccess = allowedDashboards.some((dashboard) =>
			pathname.startsWith(dashboard),
		);

		// If user tries to access a dashboard they don't have permission for
		if (!hasAccess) {
			// Redirect to their own dashboard
			const redirectPath = roleDashboardMap[role]?.[0] || '/dashboard/student';
			return NextResponse.redirect(new URL(redirectPath, request.url));
		}
	}

	// ============================================================
	// 7. ALLOW PUBLIC ROUTES
	// ============================================================
	if (isPublicRoute) {
		return NextResponse.next();
	}

	// ============================================================
	// 8. DEFAULT: ALLOW
	// ============================================================
	return NextResponse.next();
}

// ============================================================
// CONFIG: Match all routes except static files
// ============================================================
export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 */
		'/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)',
	],
};
