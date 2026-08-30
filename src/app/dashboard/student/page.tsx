import { StudentDashboardContainer } from '@/components/dashboard/student/student-dashboard-container';

export const dynamic = 'force-dynamic';

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ token?: string }>;
}) {
	const params = await searchParams;
	const token = params?.token;

	console.log('🔍 Token from searchParams:', token);

	return <StudentDashboardContainer token={token} />;
}
