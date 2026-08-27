import { Container } from '@/components/ui/container';
import { stats } from '@/mocks';

export function StatsSection() {
	return (
		<section className='py-16 border-t border-border/50'>
			<Container>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
					{stats.map((stat, index) => {
						const Icon = stat.icon;
						return (
							<div key={index} className='text-center'>
								<div className='flex justify-center'>
									<Icon className='h-8 w-8 text-purple-500' />
								</div>
								<p className='mt-3 text-3xl font-bold'>{stat.value}</p>
								<p className='text-sm text-muted-foreground'>{stat.label}</p>
							</div>
						);
					})}
				</div>
			</Container>
		</section>
	);
}
