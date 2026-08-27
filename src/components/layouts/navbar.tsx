'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { logout } from '@/lib/store/slices/auth-slice';
import { GraduationCap, LogOut, User } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/use-redux';

export function Navbar() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { user, token } = useAppSelector((state) => state.auth);
	const isAuthenticated = !!token && !!user;

	const handleLogout = () => {
		dispatch(logout());
		router.push('/');
	};

	return (
		<header className='sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur supports-backdrop-blur:bg-background/60'>
			<div className='container mx-auto flex h-16 items-center justify-between px-4 md:px-8'>
				{/* Logo */}
				<Link href='/' className='flex items-center gap-2 text-xl font-bold'>
					<GraduationCap className='h-6 w-6 text-purple-500' />
					<span className='hidden sm:inline bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent'>
						LMS
					</span>
				</Link>

				{/* Navigation Links */}
				<nav className='hidden md:flex items-center gap-6'>
					<Link
						href='/courses'
						className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
					>
						Courses
					</Link>
					<Link
						href='/blog'
						className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
					>
						Blog
					</Link>
				</nav>

				{/* Auth / User Menu */}
				<div className='flex items-center gap-4'>
					{isAuthenticated ? (
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button variant='ghost' size='sm' className='gap-2'>
									<User className='h-4 w-4' />
									<span className='hidden sm:inline'>{user.username}</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<Link href='/dashboard' className='cursor-pointer w-full'>
									<DropdownMenuItem className='w-full'>
										Dashboard
									</DropdownMenuItem>
								</Link>
								<DropdownMenuItem
									onClick={handleLogout}
									className='cursor-pointer text-red-500'
								>
									<LogOut className='h-4 w-4 mr-2' />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<>
							<Link href='/login'>
								<Button variant='ghost' size='sm'>
									Login
								</Button>
							</Link>
							<Link href='/register'>
								<Button size='sm' className='bg-purple-600 hover:bg-purple-700'>
									Get Started
								</Button>
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
