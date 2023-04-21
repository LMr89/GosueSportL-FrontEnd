import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../../model/user';


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent {
  error: any;
  users: User[] = [];
  searchResults: User[] = [];
  usuarioSeleccionado: User | null = null;
  nuevoUsuario: User = new User();
  idUsuarioBuscado: number | null = null;
  actualizarInfo = false;
  
  public mostrarErrorNombre: boolean = false;
  public mostrarErrorApellido: boolean = false;
  public mostrarErrorUsuario: boolean = false; 
  public mostrarErrorTelefono: boolean = false;
  public mostrarErrorDni: boolean = false;
  public mostrarErrorDireccion: boolean = false;

  constructor(private usuarioService: UsuarioService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.authService.loggedIn = true;
    }
    this.usuarioService.obtenerUsuarios().subscribe(
      (usuarios) => {
        this.users = usuarios;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminarUsuario(usuario: User) {
    if (window.confirm(`¿Está seguro que desea eliminar al usuario ${usuario.nombre} ${usuario.apellido}?`)) {
      this.usuarioService.eliminarUsuario(parseInt(usuario.id)).subscribe(
        () => {
          const index = this.users.indexOf(usuario);
          if (index !== -1) {
            this.users.splice(index, 1);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  mostrarFormularioEditar(usuario: User) {
    this.usuarioSeleccionado = usuario;
  }

  onCancelar(){
    this.usuarioSeleccionado = null
    this.usuarioService.obtenerUsuarios().subscribe(
      (usuarios) => {
        this.users = usuarios;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  actualizarUsuario() {
    if (this.usuarioSeleccionado) {
      this.usuarioService.editarUsuario(parseInt(this.usuarioSeleccionado.id), this.usuarioSeleccionado).subscribe(
        (usuarioActualizado) => {
          // Actualizar el usuario en la lista de usuarios
          const index = this.users.findIndex(u => u.id === usuarioActualizado.id);
          if (index !== -1) {
            this.users[index] = usuarioActualizado;
          }
          // Reiniciar el formulario de edición
          this.usuarioSeleccionado = null;
          this.nuevoUsuario = new User();
        },
        (error) => {
          console.log(error);
          this.error = error.error;

        this.mostrarErrorNombre = true;
        this.mostrarErrorApellido = true;
        this.mostrarErrorUsuario = true;
        this.mostrarErrorTelefono = true;
        this.mostrarErrorDni = true;
        this.mostrarErrorDireccion = true;
        setTimeout(() => {
          this.mostrarErrorNombre = false;
          this.mostrarErrorApellido = false;
          this.mostrarErrorUsuario = false;
          this.mostrarErrorTelefono = false;
          this.mostrarErrorDni = false;
          this.mostrarErrorDireccion = false;
        }, 3000);
        }
      );
    }
  }

  buscarUsuarioPorId() {
    if (this.idUsuarioBuscado) {
      this.usuarioService.buscarUsuario(this.idUsuarioBuscado).subscribe(
        (response) => {
          this.searchResults = [response.respuesta];
          console.log("usuario encontrado", response)
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }  
}
