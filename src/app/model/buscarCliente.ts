import { Cliente } from "./cliente";

export class Respuesta {
  httpStatus: number=0;
  mensaje: string="";
  tiempo: string = "";
  respuesta: Cliente = new Cliente;
}