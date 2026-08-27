import { HomePage } from '@/components/home';
import { featuredCourses } from '@/mocks';

export default function Home() {
	return <HomePage courses={featuredCourses} />;
}
