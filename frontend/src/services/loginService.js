import { validateUsuario } from "../constantes/urlEndpoints";
import { http } from "../utils";

const makeUserValidation = (json) => http.post(`${validateUsuario}`, json);

export { makeUserValidation };
