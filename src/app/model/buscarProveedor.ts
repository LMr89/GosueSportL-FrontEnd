import { Proveedor } from "./proveedor";

export class Respuesta {
  httpStatus: number=0;
  mensaje: string="";
  tiempo: string = "";
  respuesta: Proveedor = new Proveedor;
}