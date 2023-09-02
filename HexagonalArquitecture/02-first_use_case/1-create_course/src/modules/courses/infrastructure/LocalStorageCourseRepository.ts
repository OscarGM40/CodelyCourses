import { Course } from "../domain/Course";
import { CourseRepository } from "../domain/CourseRepository";

export function createLocalStorageCourseRepository(): CourseRepository {
	return {
		save,
		get,
		getAll,
	};
}

// fijate que esto es una función privada,pues no la exporto.Fijate tmb como la function de arriba me ha obligado a definir la implementación de save, por qué?
async function save(course: Course) {
	const courses = getAllFromLocalStorage();
	// dado que son un Map los debo guardar con set
	courses.set(course.id, course);
	localStorage.setItem("courses", JSON.stringify(Array.from(courses.entries())));
	await Promise.resolve();
}

async function get(id: string) {
	const courses = getAllFromLocalStorage();
	const course = courses.get(id); //es un Map,accedo con get a la key
	if (!course) {
		return Promise.resolve(null);
	}

	return Promise.resolve(course);
}

async function getAll() {
	const courses = getAllFromLocalStorage();

	// Array sin las keys,que pro esta gente,tu
	return Promise.resolve(Array.from(courses.values()));
}

// funcion privada
function getAllFromLocalStorage(): Map<string, Course> {
	const courses = localStorage.getItem("courses");
	if (courses === null) {
		return new Map();
	}
	// porque no es as Map<string,Course>, desde luego debe ser Iterable<R,T> y devuelve un Map,xd
	const map = new Map(JSON.parse(courses) as Iterable<[string, Course]>);

	return map;
}
