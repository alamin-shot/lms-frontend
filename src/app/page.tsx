import { HomePage } from '@/components/home';
import { courseService } from '@/services/course.service';

export default async function Home() {
	const courses = await courseService.getAll();
	return <HomePage courses={courses} />;
}
