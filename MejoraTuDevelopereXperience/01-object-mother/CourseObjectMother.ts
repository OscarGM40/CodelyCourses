import { faker } from "library";
import { CourseObject } from "./CourseObject";

// Con Partial<T> creo un tipo parcial del dominio
type PartialCourseObject = Partial<CourseObject>;

export class CourseObjectMother {
  static create(partialCourse?:PartialCourseObject):CourseObject {
    const randomCourse : CourseObject = {
      id: faker.string.uuid(),
      slug: faker.string.alpha(10),
      title: faker.string.alpha(20),
    }
    const courseOverridingDefaults = {
      ...randomCourse,
      ...partialCourse
    };
    return courseOverridingDefaults;
  }
}