import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

export function proxy(request: NextRequest) {
	const token = request.cookies.get('jwt')?.value;
	const storedRoleCookie = request.cookies.get('userRole')?.value;
	const storedRole = storedRoleCookie
		? decodeURIComponent(storedRoleCookie)
		: undefined;
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
	// 2. PROTECTED ROUTES (auth required)
	// ============================================================
	// Lesson player routes: /courses/[slug]/lessons/[id]
	const isLessonRoute = /^\/courses\/[^\/]+\/lessons\/\d+$/.test(pathname);
	const isDashboardRoute = pathname.startsWith('/dashboard');

	// ============================================================
	// 3. PROTECT LESSON ROUTES (auth only)
	// ============================================================
	if (isLessonRoute && !token) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// ============================================================
	// 4. PROTECT DASHBOARD ROUTES
	// ============================================================
	if (isDashboardRoute && !token) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// ============================================================
	// 5. REDIRECT LOGGED-IN USERS AWAY FROM AUTH PAGES
	// ============================================================
	if (token && (pathname === '/login' || pathname === '/register')) {
		const payload = decodeJWT(token);
		const role = storedRole || payload?.role || 'Student';
		const dashboardMap: Record<string, string> = {
			Student: '/dashboard/student',
			Instructor: '/dashboard/instructor',
			'Content Manager': '/dashboard/content-manager',
			Admin: '/dashboard/admin',
		};
		return NextResponse.redirect(
			new URL(dashboardMap[role] || '/dashboard/student', request.url),
		);
	}

	// ============================================================
	// 6. REDIRECT SHORT URLs
	// ============================================================
	if (pathname === '/student') {
		return NextResponse.redirect(new URL('/dashboard/student', request.url));
	}
	if (pathname === '/instructor') {
		return NextResponse.redirect(new URL('/dashboard/instructor', request.url));
	}
	if (pathname === '/admin') {
		return NextResponse.redirect(new URL('/dashboard/admin', request.url));
	}
	if (pathname === '/content-manager') {
		return NextResponse.redirect(
			new URL('/dashboard/content-manager', request.url),
		);
	}

	// ============================================================
	// 7. ROLE-BASED ACCESS FOR DASHBOARDS
	// ============================================================
	if (isDashboardRoute && token) {
		const payload = decodeJWT(token);
		const role = storedRole || payload?.role || 'Student';

		const roleDashboardMap: Record<string, string[]> = {
			Student: ['/dashboard/student'],
			Instructor: ['/dashboard/instructor'],
			'Content Manager': ['/dashboard/content-manager'],
			Admin: ['/dashboard/admin'],
		};

		const allowedDashboards = roleDashboardMap[role] || [];
		const hasAccess = allowedDashboards.some((dashboard) =>
			pathname.startsWith(dashboard),
		);

		if (!hasAccess) {
			const redirectPath = roleDashboardMap[role]?.[0] || '/dashboard/student';
			return NextResponse.redirect(new URL(redirectPath, request.url));
		}
	}

	// ============================================================
	// 8. ALLOW PUBLIC ROUTES
	// ============================================================
	if (isPublicRoute) {
		return NextResponse.next();
	}

	// ============================================================
	// 9. DEFAULT: ALLOW
	// ============================================================
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
