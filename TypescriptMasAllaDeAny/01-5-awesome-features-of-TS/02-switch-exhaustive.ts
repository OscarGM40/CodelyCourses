export const enum CourseCategory {
  FRONTEND = "FRONTEND",
  BACKEND = "BACKEND",
  BEST_PRACTICES = "BEST_PRACTICES",
}


const frontendCourseCategory = CourseCategory.BEST_PRACTICES;

export function print(courseCategory: CourseCategory) {
  switch (courseCategory) {
    case CourseCategory.FRONTEND:
      return "This is the frontend course category";
    case CourseCategory.BACKEND:
      return "This is the backend course category";
    // If I remove this case it will throw a compile time error due to the assertNever fn
    case CourseCategory.BEST_PRACTICES:
      return "This is the backend course category";
    // aqui gracias al narrowing que hará el transpilador si no paso por todos los cases la función assertNever no va a recibir un valor de tipo never(sino que recibirá el valor que falte)y petará
    default:
      assertNever(courseCategory)
  }
}

function assertNever(value:never){
  // We will also get an error in runtime because we are throwing an exception in assertNever method
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

print(frontendCourseCategory)

const printMap = (courseCategory:CourseCategory) => {
  // otra forma al switch es usar Maps,etc
  const OPTIONS:{[key in CourseCategory]:string} = {
    BACKEND:"this is the frontend",
    FRONTEND:"this is the frontend",
    BEST_PRACTICES:""
  }
}