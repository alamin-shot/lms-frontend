import { ReactNode } from 'react';

interface AuthLayoutProps {
	children: ReactNode;
	title: string;
	subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
	return (
		<div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900/10 via-background to-background'>
			<div className='w-full max-w-md'>
				<div className='text-center mb-8'>
					<h1 className='text-3xl font-bold bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent'>
						{title}
					</h1>
					<p className='text-muted-foreground mt-2'>{subtitle}</p>
				</div>
				<div className='bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border/50 shadow-xl'>
					{children}
				</div>
			</div>
		</div>
	);
}
