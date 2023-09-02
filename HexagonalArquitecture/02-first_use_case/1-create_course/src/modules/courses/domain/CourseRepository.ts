import { Course } from "./Course";

export interface CourseRepository {
	save: (course: Course) => Promise<void>;
	getAll: () => Course[] | Promise<Course[]>;
	get: (courseId: string) => Promise<Course | null>;
}
