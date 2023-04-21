import { Cliente } from './cliente';
import { User } from './user';
import { DetalleVenta } from './detalleVenta';

export class Venta {
  idVenta: number = 0;
  clienteNombre: string = "";
  idCliente: Cliente = new Cliente();
  idUsuario: User = new User();
  fecha: string = "";
  igv: number = 0;
  total: number = 0;
  estado: boolean = true;
  detalles: DetalleVenta[] = [];
  detalleVentas: DetalleVenta[] = []; 
  ticketUri: string = "";
}