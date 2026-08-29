import { StudentDashboardContainer } from '@/components/dashboard/student/student-dashboard-container';

export const dynamic = 'force-dynamic';

export default async function Page() {
	return <StudentDashboardContainer />;
}
