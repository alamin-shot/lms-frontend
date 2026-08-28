'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
	href?: string;
	label?: string;
	onClick?: () => void;
}

export default function BackButton({
	href,
	label = 'Back',
	onClick,
}: BackButtonProps) {
	const router = useRouter();

	const handleClick = () => {
		console.log('BackButton clicked:', { href, hasCustomHandler: !!onClick });

		if (onClick) {
			onClick();
			return;
		}

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
