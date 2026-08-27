import { ReactNode } from 'react';
import { Container } from '@/components/ui/container';

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Container className='py-8'>{children}</Container>
		</>
	);
}
