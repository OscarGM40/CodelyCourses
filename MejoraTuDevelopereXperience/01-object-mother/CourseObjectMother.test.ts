import { CourseObjectMother } from "./CourseObjectMother"


describe('CourseObjectMother', () => { 
  ** En este primer ejemplo tengo que crear el curso entero. En este ejemplo da igual,pero si fuera muy grande Course es engorroso
  it("has properties defined",()=> {
    const course = {
      id: "",
      title:"kgask",
      slug:""
    }
    expect(course.id).toBeDefined()
    expect(course.title).toBeDefined()
    expect(course.slug).toBeDefined()
  })

  ** En este ejemplo me queda muy claro los beneficios de juntar faker con Partial de T y solo pasar las props que yo quiera.Obviamente tengo la duda de cuan útil es esto cuando el objeto es gigante
  it("has specified title",() => {
    const expectedTitle = "TS";
    const course = CourseObjectMother.create({title: "TS"})
    expect(course.title).toBe(expectedTitle)
  })
 })