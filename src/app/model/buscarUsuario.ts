import { User } from "./user";

export class Respuesta {
  httpStatus: number=0;
  mensaje: string="";
  tiempo: string = "";
  respuesta: User = new User;
}
