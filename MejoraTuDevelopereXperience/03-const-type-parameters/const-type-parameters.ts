// este archivo es solo para ver para que sirven

export type User = { name: string, age: number};

// T extends User es un contrato,donde T debe ser subclase de User o User tmb.Fijate como decimos que la funcion va a devolver una propiedad con T["name"], en vez de poner string,por ejemplo
function getUserName<T extends User>(user:T): T["name"] {
  return user.name;
}

// NOTA: al decir que retorna T["name"] Typescript va a inferir un string simplemente, pero esto va a cambiar con los const type parameters(o sea que de momento simplemente infiere el primitivo)

// si miro el valor de retorno veré que user1 es un string
const user1 = getUserName({name: "Isma",age:31})
// pero aqui veré que es el literal "Isma", mola
const user2 = getUserName({name: "Isma",age:31} as const)

// la utilidad en el mundo real de que el transpilador sepa el valor,ya que en la mayoria de casos va a ser un valor que no se sabrá hasta compilar(llamadas a API) se da en objetos de configuración,eetc(todo lo que no venga de una API y sea posible resolver al transpilar ??)


// NOTA: hasta la version 5.0 solo podia usar as const en la llamada a la funcion ,pero no en la definicion de la misma,sólo en su llamada.Esto cambió y ahora puedo tipar la función para forzar su entrada,mola

function getConstantUserName<const T extends User>(user: T):T["name"]{
  return user.name
} // funcion con entrada constante,luego va a devolver un literal
const user3 = getConstantUserName({name:"Hulio",age:33}) // ya no hace falta el as const,ya hace el narrowing la function

type HasNames = {names: readonly string[]};
function getNamesExactly<const T extends HasNames>(arg:T):T["names"]{
  return arg.names;
}
const names = getNamesExactly({names:["alba","elisa","ricardo"]})