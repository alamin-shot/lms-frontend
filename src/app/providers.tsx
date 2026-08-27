'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';

interface ProvidersProps {
	children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	return (
		<Provider store={store}>
			{children}
			<Toaster position='top-right' richColors />
		</Provider>
	);
}
