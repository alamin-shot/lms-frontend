import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
	return (
		<section className='relative overflow-hidden bg-linear-to-br from-purple-900/20 via-background to-background py-20 md:py-32'>
			<Container>
				<div className='flex flex-col items-center text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700'>
					<h1 className='text-4xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent'>
						Learn Anything, Anytime
					</h1>
					<p className='mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl'>
						Join thousands of students learning from expert instructors. Start
						your learning journey today.
					</p>
					<div className='mt-8 flex flex-wrap gap-4 justify-center'>
						<Link href='/register'>
							<Button
								size='lg'
								className='gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xl p-6'
							>
								Get Started <ArrowRight className='h-4 w-4' />
							</Button>
						</Link>
						<Link href='/courses'>
							<Button variant='outline' size='lg' className='gap-2 text-xl p-6'>
								Browse Courses
							</Button>
						</Link>
					</div>
				</div>
			</Container>
		</section>
	);
}
