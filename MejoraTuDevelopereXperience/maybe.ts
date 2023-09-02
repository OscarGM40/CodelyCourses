export type Course = {
  name: string;
}

// custom utility Type
type Maybe<T> = T | undefined;

function tryCreateCourse(): Maybe<Course> {
  throw new Error('Not implemented yeet')
}

const course = tryCreateCourse();

if(course){  // narrowing
  course.name
}
// type narrowing es justo lo que parece, estrechar un tipo general en algo más preciso.Tanto los union types(string | number) como los optional types(x?:number) normalmente requieren narrowing
// to narrow a union type to one,debo considerar cada caso.Hay varias formas de hacer narrowing,dependiendo de si estoy con clases puede que necesite instanceof o typeof o el if(instance) de arriba.Es algo fundamenta
function toString<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        toString() {
            let [...values]: string[] = Object.values(this);
            let mappedValues: string | (string | null)[];
 
            mappedValues = values.map((value) => (value ? value : null));
 
            return mappedValues.join(", ");
        }
    };
}

