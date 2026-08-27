import { Course } from '@/types/course.types';
import { HeroSection } from './hero-section';
import { StatsSection } from './stats-section';
import { FeaturedCoursesSection } from './featured-courses-section';

interface HomePageProps {
	courses: Course[];
}

export function HomePage({ courses }: HomePageProps) {
	return (
		<main>
			<HeroSection />
			<StatsSection />
			<FeaturedCoursesSection courses={courses} />
		</main>
	);
}
