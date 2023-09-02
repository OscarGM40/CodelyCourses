type CourseStatus = "archived" | "active";

export interface Course {
  name: string;
  status: CourseStatus;
}

// imaginando que quiero tener otro objeto con los cursos agrupados segun tipo,podria crear este tipo, sin embargo no es lo mejor, es mejor decirle que las keys serán  las formadas por el type CourseStatus e irían agregandose solas aqui,etc
type GroupedCoursesByStatus = {
  active: Course[];
  archived: Course[];
};

// fijate que ellos han ido un poco más allá y están tipando el retorno de la función,muy pros
export function groupByStatus(courses: Course[]): Record<CourseStatus, Course[]> {
  const grouped: Record<CourseStatus, Course[]> = {
    active: [],
    archived: [],
  };

  // asi mejor pues solo itera una vez,asinto prehistoric
  courses.forEach((course) => grouped[course.status].push(course));
  // esta forma además no me dejaría implementar el Open/Closed,ya que agregar un tercer estado me hacía agregar un tercer filtrado,mientras que lo de arriba es más performante y escala solo,es mejor,asintooo
  /* return {
    active: courses.filter((course) => course.status === "active"),
    archived: courses.filter((course) => course.status === "archived"),
  }; */
  return grouped;
}
