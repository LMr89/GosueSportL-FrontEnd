import { Cliente } from './cliente';
import { Ordenadores } from './ordenadores';

export class Alquiler {
    idAlquiler: string = "";
    idCliente: Cliente = new Cliente();
    idOrdenador: Ordenadores = new Ordenadores();
    fecha: string = "";
    tiempo: number = 0;
    monto: number = 0;
    estado: boolean = true;
}