'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
	href?: string;
	label?: string;
}

export default function BackButton({ href, label = 'Back' }: BackButtonProps) {
	const router = useRouter();

	const handleClick = () => {
		if (href) {
			router.push(href);
		} else {
			router.back();
		}
	};

	return (
		<Button variant='ghost' className='gap-2' onClick={handleClick}>
			<ArrowLeft className='h-4 w-4' /> {label}
		</Button>
	);
}
