import { Course } from "../domain/Course";
import { CourseRepository } from "../domain/CourseRepository";

const BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";

export function createApiCourseRepository(): CourseRepository {
	return {
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		save,
		get,
		getAll,
	};
}

async function save(course: Course) {
	try {
		await fetch(`${BASE_URL}/api/courses/create`, {
			method: "POST",
			body: JSON.stringify({
				id: course.id,
				name: course.title,
				imageUrl: course.imageUrl,
			}),
		});
	} catch (error) {
		console.error(error);
	}
}

async function get(id: string) {
	const course = await fetch(`${BASE_URL}/api/courses/${id}`).then(
		(response) => response.json() as Promise<Course>
	);

	return course;
}

async function getAll() {
	const courses = await fetch(`${BASE_URL}/api/courses`).then(
		(response) => response.json() as Promise<Course[]>
	);

	return courses;
}
