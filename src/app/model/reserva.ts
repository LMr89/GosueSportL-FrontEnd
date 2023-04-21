import { Ordenadores } from './ordenadores';
import { Cliente } from './cliente';
import { User } from './user';

export class Reserva {
  idReserva: number = 0;
  fechaInicio: string = '';
  fechaFin: string = '';
  tiempo: number = 0;
  idOrdenador: Ordenadores = new Ordenadores();
  cliente: Cliente = new Cliente();
  idUsuario: User = new User();
  usuario: string = "";
  monto: number = 0;
  estado: boolean = true;
}
