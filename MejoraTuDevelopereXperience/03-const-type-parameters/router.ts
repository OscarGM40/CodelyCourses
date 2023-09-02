// ejemplo de const type parameters para fijar las rutas de la app
export type Route = {
  name: string;
  path: string;
  params: readonly string[];
};

// fijate como puedo recortar un union type que sean objetos a ciertos valores.Interesante
type RouteNames = GeneratedRoutesType["name"];
type PathNames = GeneratedRoutesType["path"];
// Extract<T,Objecto> me va a permitir construir un nuevo type de otro type que parece que debe ser un union type.Extraerá en base a la condición del segundo genérico, luego Extract<T,{name:"courses"}>["params"] va a construir otro union type del union type original con el valor de courses en su propieda name y por ultimo entramos al valor de la key["params"] luego me va a dar solo el valor de params tras extraer y construir el nuevo type para ese caso(que es ["category"]) Ojo, construye un type, no un union type
type RouteParams = Extract<GeneratedRoutesType, { name: "courses" }>["params"];

function buildRouter<const T extends Route>(routes: T[]) {
  const getRoute = <
    // o login o courses,fijate que se refiere al valor
    RouteName extends T["name"],
    // el valor que tenga params,de ese nuevo tipo que concuerde con el primer argumento,el name.wtf!
    RouteParams extends Extract<T, { name: RouteName }>["params"],
  >(
    name: RouteName,
    // dado que RouteParams simplemente devuelve el valor de params para ese nuevo tipo segun su condición,etc,ese valor es un arreglo,asi que { [key in RouteParams[number]:string] } va a pasar a objeto ese arreglo,con las keys que sean las [key in RouteParams[number]]:string <- y ese number?
    params: { [key in RouteParams[number]]: string },
  ): string => {
    // pillamos el path
    const route = routes.find((n) => n.name && n.name === name)!.path;
    Object.entries<string>(params).forEach(([key, value]) => {
      route.replace(`:${key}`, value);
    });
    return route;
  };
  return { getRoute };
}

// Routename y RouteParams son tipos que nos inventamos sobre la marcha,para tipar los parametros
const myFunction = <T, R>(arg1: T, arg2: R) => {};

// fijate que además es una función interna,que ya accede al T externo:
const buildRouter2 = <const T extends Route>(routes: T[]): string => {
  const anotherFunction = <X extends T["name"], Y extends Extract<T, { name: X }>["params"]>(
    name: X,
    params: { [key in Y[number]]: string },
  ): string => {
    return routes[0].name;
  };
  return "asinto";
};

// Ejemplo de narrowing explicando el porqué funciona la firma anterior
type GeneratedRoutesType =
  | { name: "login"; path: "/login"; params: [""] }
  | { name: "courses"; path: "/courses"; params: ["category", "access"] };

const { getRoute } = buildRouter([
  {
    name: "login",
    path: "/login",
    params: [],
  },
  {
    name: "courses",
    path: "/courses/:category",
    params: ["category", "access"],
  },
]);
// fijate que ahora getRoute ya no pide dos argumentos cualquiera, sino que pide objetos literales,y además segun que argumento sea,pedirá category,etc .Sinceramente es bonito pero no parece útil
const route = getRoute("courses", { category: "category", access: "none" });

type myCollection = ["rosa", "amarillo", "azul"];

const Colores: { [key in myCollection[number]]: string } = {
  amarillo: "",
  azul: "",
  rosa: "",
};

// un problema comun en TS es querer solo las keys de un objeto u array que sean de un determinado tipo primitivo:
type MyType = {
  a: string;
  b: string;
  c: boolean;
  d: number;
}

const onlyStrings: {[key in keyof MyType]:string}[keyof MyType] = "asdf"
