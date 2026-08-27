'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function CourseSearch() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleSearch = useCallback(
		(term: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (term) {
				params.set('search', term);
			} else {
				params.delete('search');
			}
			router.push(`/courses?${params.toString()}`);
		},
		[router, searchParams],
	);

	return (
		<div className='relative max-w-md w-full'>
			<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
			<Input
				type='text'
				placeholder='Search courses...'
				className='pl-10'
				defaultValue={searchParams.get('search') || ''}
				onChange={(e) => handleSearch(e.target.value)}
			/>
		</div>
	);
}
