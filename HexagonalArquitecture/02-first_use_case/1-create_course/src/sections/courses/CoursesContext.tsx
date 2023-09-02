import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { createCourse } from "../../modules/courses/application/create/createCourse";
import { getAllCourses } from "../../modules/courses/application/get-all/getAllCourses";
import { Course } from "../../modules/courses/domain/Course";
import { CourseRepository } from "../../modules/courses/domain/CourseRepository";

export interface ContextState {
	courses: { id: string; title: string; imageUrl: string }[];
	createCourse: (course: { title: string; imageUrl: string }) => void;
}

export const CoursesContext = React.createContext({} as ContextState);

export const CoursesContextProvider = ({
	children,
	repository,
}: React.PropsWithChildren<{ repository: CourseRepository }>) => {
	const [courses, setCourses] = useState<Course[]>([]);

	async function create({ title, imageUrl }: { title: string; imageUrl: string }) {
		const id = (uuidv4 as () => string)();
		await createCourse(repository, { id, title, imageUrl });
		await getCourses();
	}

	async function getCourses() {
		const courses = await getAllCourses(repository);
		setCourses(courses);
	}

	useEffect(() => {
		getCourses().catch((error) => console.error(error));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		<CoursesContext.Provider value={{ courses, createCourse: create }}>
			{children}
		</CoursesContext.Provider>
	);
};

export const useCoursesContext = () => useContext(CoursesContext);
