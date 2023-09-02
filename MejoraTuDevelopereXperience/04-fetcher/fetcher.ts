import { EndpointPayload } from "./EndpointPayload";
import { CreateCoursePayload } from "./CreateCoursePayload";
import { CreateUserPayload } from "./CreateUserPayload";

type Endpoint = {
  name: string;
  url: string;
  // fijate como ha tipado el valor como una llamada a un constructor,y lo que retornará ese constructor
  payload: new (...params: any) => EndpointPayload;
};

function setupFetcher<
  const GetEndpoint extends Endpoint,
  const PostEndpoint extends Endpoint,
>(endpoints: { get: GetEndpoint[]; post: PostEndpoint[] }) {
  // de nuevo fijate como tengo un objeto y quiero que sus llaves me hagan de tipado luego x: keyof typeof obj
  const endpointNameToUrl = (method: keyof typeof endpoints, name: string) => {
    // const endpointByMethod = endpoints[method];
    const endpointsArray = [endpoints.get, endpoints.post] as const;

    const endpoint = endpointsArray.map((t: Array<Endpoint>) => t.find((x) => x.name === name));
    if (!endpoint[0]) {
      throw new Error(`Unexpected fetcher error: Endpoint ${name} not found`);
    }
    return endpoint[0]!.url;
  };

  const post = <
    TName extends PostEndpoint["name"],
    TPayload extends Extract<PostEndpoint, { name: TName }>["payload"],
  >(
    name: TName,
    // el utilityType InstanceType<T> me permite tipar un valor con el valor de la llamada al constructor T,en este caso TPayload,que será a su vez cualquier cosa resultante de TPayload extends Extract<PostEndpoint, {name:TName}>["payload"] <- cualquier payload
    payload: InstanceType<TPayload>,
  ) => {
    // TODO aqui iria la llamada mediante axios,fetch,etc
    console.log(endpointNameToUrl("post", name), payload.toString());
  };
 
  return { post };
}

// aqui declararía los endpoints con su name,url y payload
const api = setupFetcher({
  get: [],
  post: [
    {
      name: "createUser",
      url: "/api/user",
      payload: CreateUserPayload,
    },
    {
      name: "createCourse",
      url: "/api/course",
      payload: CreateCoursePayload,
    },
  ],
});

// al final en el dia a dia esto sería lo que implementariamos todos cuando quisieramos hacer una llamada a la api.Lo de arriba sería hacerlo una primera vez y ya.Parece interesante todo esto( sobre todo si le intregraramos la gestión de errores tmb)
api.post("createCourse",new CreateCoursePayload("sdfas",new Date("2020-02-02")))
api.post("createUser",new CreateUserPayload("curso"))