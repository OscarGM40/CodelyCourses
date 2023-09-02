// tenemos un objeto Settings cuyas keys serán un string y su value seria o un Value o el mismo de nuevo(fijae como huele a yaml)
type Setting = string | Settings;
type Settings = { [key: string]: Setting };

const settings = {
  environment: {
    value: "dev",
  },
  database: {
    host: {
      value: "localhost ",
    },
  },
  stripe: "asdf",
} satisfies Settings;

// de nuevo si hacemos const settings:Settings no tenemos autocompletado
const db = settings.database; // <- sin autocompletado
// e incluso tenemos que hacer narrowing de propiedades(por que no vemos a database,implosible ver subpropiedades):
const host = settings.database.host;
// hay que hacer narrowing(if prop in obj.prop)
if ("host" in settings.database) {
  settings.database.host;
}

// la solución es usar satisfies.ESto es la puta ostia,tio
const hostValue = settings.database.host.value;

// TIP puedo tipar un string para que pida un formato concreto
type User = {
  contact: number | `${string}@${string}`;
};

// TIP y si uso satisfies sobre un union type me dará autocompletado segun la opcion de la implementación
const Javi = {
  contact: "paco@email",
} satisfies User;
const firstEmailLetter = Javi.contact.charAt(0);

