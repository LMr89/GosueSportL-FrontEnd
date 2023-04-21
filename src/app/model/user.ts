export class User {
  id: string = "";
  nombre: string = "";
  apellido: string = "";
  nomUsuario: string = "";
  correo: string = "";
  password: string = "";
  confirmPassword: string = "";
  direccion: string = "";
  dni: string = "";
  telefono: string = "";
  roles: {id: number, rolNombre: string}[] = [];
  }