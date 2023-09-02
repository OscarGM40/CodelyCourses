// fijate que tengo recursividad en las rutas,cada route puede tener Children o no.Fijate que la clave está en la opcionalidad de ello.Amazing
type Route = { path: string; children?: Routes };
type Routes = { [key: string]: Route };

const routes = {
  AUTH: {
    path: "/auth",
  },
  LIST: {
    path: "/list",
  },
  PATATA:{
    path:"patata"
  }
} as const satisfies Routes;


routes.AUTH.path