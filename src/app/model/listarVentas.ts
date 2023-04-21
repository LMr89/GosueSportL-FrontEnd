import { Venta } from "./venta";

export class Respuesta {
  httpStatus: number=0;
  mensaje: string="";
  tiempo: string = "";
  respuesta: Venta[] = [];
}