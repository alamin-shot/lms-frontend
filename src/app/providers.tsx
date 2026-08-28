'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { restoreUser } from '@/lib/store/slices/auth-slice';
import { useAppSelector } from '@/lib/hooks/use-redux';
import { useEffect } from 'react';

interface ProvidersProps {
	children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	return (
		<Provider store={store}>
			<SessionRestore>{children}</SessionRestore>
			<Toaster position='top-right' richColors />
		</Provider>
	);
}

function SessionRestore({ children }: ProvidersProps) {
	const { token, user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (token && !user) {
			void store.dispatch(restoreUser());
		}
	}, [token, user]);

	return children;
}
