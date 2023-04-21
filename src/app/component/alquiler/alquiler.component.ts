import { Component } from '@angular/core';
import { Cliente } from '../../model/cliente';
import { ClienteService } from '../services/cliente.service';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alquiler } from 'src/app/model/alquiler';
import { Ordenadores } from 'src/app/model/ordenadores';
import { OrdenadorService } from '../services/ordenador.service';
import { OrdenadorLinea } from 'src/app/model/ordenadorLinea';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.css']
})
export class AlquilerComponent {
  cliente: Cliente[] = [];
  clientesBloqueados: Cliente[] = [];
  alquiler: Alquiler[] = [];
  ordenadores: Ordenadores[] = [];
  ordenadoresLinea: OrdenadorLinea[] = [];
  searchResults: Cliente[] = [];
  clienteSeleccionado: Cliente | null = null;
  nuevoCliente: Cliente = new Cliente();
  nuevoAlquiler: Alquiler = new Alquiler();
  registrationForm!: FormGroup;
  public registroExitoso: boolean = false;
  mostrarFormularioRegistro = false;
  mostrarFormularioRegistroAlquileres = false;
  estaBloqueado: boolean | null = null;
  registrandoNuevoCliente = false;
  registrandoNuevoAlquiler = false;
  actualizarTitulo = false;
  dni: number | null = null;
  originalCliente: any;

  error: any;
  public mostrarErrorNombre: boolean = false;
  public mostrarErrorApellido: boolean = false;
  public mostrarErrorUsuario: boolean = false; 
  public mostrarErrorTelefono: boolean = false;
  public mostrarErrorDni: boolean = false;
  public mostrarErrorDireccion: boolean = false;
  public mostrarErrorCorreo: boolean = false;
  public mostrarErrorMonto: boolean = false;
  public errorAlquileres: string = "";
  public errorOrdenadores: string = "";
  

  constructor(private ordenadorService: OrdenadorService,private clienteService: ClienteService, private formBuilder: FormBuilder, private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.authService.loggedIn = true;
    }
    this.clienteService.obtenerClientes().subscribe(
      (cliente) => {
        this.cliente = cliente;
      },
      (error) => {
        console.error(error);
      }
    );

    this.clienteService.obtenerClientes().subscribe(
      (clientes) => {
        this.clientesBloqueados = clientes.filter((cliente) => !cliente.esBloqueado);
      },
      (error) => {
        console.error(error);
      }
    );

    this.clienteService.obtenerAlquiler().subscribe(
      (alquiler) => {
        this.alquiler = alquiler;
      },
      (error) => {
        console.error(error);
        this.errorAlquileres = 'No hay alquileres registrados por el momento';
      }
    );

    this.ordenadorService.obtenerOrdenadores().subscribe(
      (ordenador) => {
        this.ordenadores = ordenador;
      },
      (error) => {
        console.error(error);
      }
    );

    /*setInterval(() => {
      this.clienteService.ordenadoresLinea().subscribe(
        (ordenadoresLinea) => {
          this.ordenadoresLinea = ordenadoresLinea;
        },
        (error) => {
          console.error(error);
          this.errorOrdenadores = 'No hay ningun ordenador en linea';
        }
      );
    }, 1500);*/
    
    this.clienteService.ordenadoresLinea().subscribe(
      (ordenadoresLinea) => {
        this.ordenadoresLinea = ordenadoresLinea;
      },
      (error) => {
        console.error(error);
        this.errorOrdenadores = 'No hay ningun ordenador en linea';
      }
    );

    this.registrationForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      nomUsuario: ['', Validators.required],
      correo: ['', Validators.required]
    });
  }

  onSubmit() {
    this.clienteService.registrarCliente(this.nuevoCliente).subscribe(
      response => {
        console.log(response);
        this.registroExitoso = true;
        this.clienteService.obtenerClientes().subscribe(
          (cliente) => {
            this.cliente = cliente;
          },
          (error) => {
            console.error(error);
          }
        );
        setTimeout(() => {
          this.registroExitoso = false;
          this.mostrarFormularioRegistro = false
          }, 2000);
      },
      error => {
        console.log(error);
        this.error = error.error;

        this.mostrarErrorNombre = true;
        this.mostrarErrorApellido = true;
        this.mostrarErrorUsuario = true;
        this.mostrarErrorTelefono = true;
        this.mostrarErrorDni = true;
        this.mostrarErrorDireccion = true;
        this.mostrarErrorCorreo = true;
        setTimeout(() => {
          this.mostrarErrorNombre = false;
          this.mostrarErrorApellido = false;
          this.mostrarErrorUsuario = false;
          this.mostrarErrorTelefono = false;
          this.mostrarErrorDni = false;
          this.mostrarErrorDireccion = false;
          this.mostrarErrorCorreo = false;
        }, 3000);

        const mensajeError = error.error.errores[0];
        alert(mensajeError);
      }  
    );
  }

  mostrarFormularioEditar(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
  }

  onCancelar(){
    this.clienteSeleccionado = null
    this.clienteService.obtenerClientes().subscribe(
      (cliente) => {
        this.cliente = cliente;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminarCliente(cliente: Cliente) {
    if (window.confirm(`¿Está seguro que desea eliminar al usuario ${cliente.nombre}: ${cliente.apellido}?`)) {
      this.clienteService.eliminarCliente(cliente.idCliente).subscribe(
        () => {
          const index = this.cliente.indexOf(cliente);
          if (index !== -1) {
            this.cliente.splice(index, 1);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  actualizarCliente() {
    if (this.clienteSeleccionado) {
      this.clienteService.actualizarClientes(this.clienteSeleccionado.idCliente, this.clienteSeleccionado).subscribe(
        (clienteActualizado) => {
          // Actualizar el usuario en la lista de usuarios
          const index = this.cliente.findIndex(u => u.idCliente === clienteActualizado.idProveedor);
          if (index !== -1) {
            this.cliente[index] = clienteActualizado;
          }
          // Reiniciar el formulario de edición
          this.clienteSeleccionado = null;
          this.nuevoCliente = new Cliente();
        },
        error => {
          console.log(error);
          this.error = error.error;
  
          this.mostrarErrorNombre = true;
          this.mostrarErrorApellido = true;
          this.mostrarErrorUsuario = true;
          this.mostrarErrorTelefono = true;
          this.mostrarErrorDni = true;
          this.mostrarErrorDireccion = true;
          this.mostrarErrorCorreo = true;
          setTimeout(() => {
            this.mostrarErrorNombre = false;
            this.mostrarErrorApellido = false;
            this.mostrarErrorUsuario = false;
            this.mostrarErrorTelefono = false;
            this.mostrarErrorDni = false;
            this.mostrarErrorDireccion = false;
            this.mostrarErrorCorreo = false;
          }, 3000);
        }
      );
    }
  }

  manejarCambioBloqueo() {
    if(this.clienteSeleccionado){
      this.estaBloqueado = this.clienteSeleccionado ? !this.clienteSeleccionado.esBloqueado : false;
    }
  }

  buscarClientes() {
    if (this.dni) {
      this.clienteService.buscarCliente(this.dni).subscribe(
        (response) => {
          this.searchResults = [response.respuesta];
          console.log("cliente encontrado", response)
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.searchResults = [];
    }
  } 

  registrarAlquiler() {
    this.clienteService.registrarAlquiler(this.nuevoAlquiler).subscribe(
      response => {
        console.log(response);
        this.registroExitoso = true;
        this.clienteService.obtenerAlquiler().subscribe(
          (alquiler) => {
            this.alquiler = alquiler;
          },
          (error) => {
            console.error(error);
            this.errorAlquileres = 'No hay alquileres registrados por el momento';
          }
        );
        setInterval(() => {
          this.clienteService.ordenadoresLinea().subscribe(
            (ordenadoresLinea) => {
              this.ordenadoresLinea = ordenadoresLinea;
            },
            (error) => {
              console.error(error);
              this.errorOrdenadores = 'No hay ningun ordenador en linea';
            }
          );
        }, 10000);
        setTimeout(() => {
          this.registroExitoso = false;
          this.mostrarFormularioRegistro = false
          }, 2000);
      },
      error => {
        console.log(error);
        this.error = error.error;
        if(error.error.monto){
          this.mostrarErrorMonto = true;
          setTimeout(() => {
            this.mostrarErrorMonto = false;
          }, 3000);
        }
        const mensajeError = error.error.errores[0];
        alert(mensajeError);
      }  
    );
  }

  eliminarAlquiler(alquiler: Alquiler) {
    if (window.confirm(`¿Está seguro que desea anular el alquiler ${alquiler.idAlquiler}?`)) {
      this.clienteService.eliminarAlquiler(parseInt(alquiler.idAlquiler)).subscribe(
        () => {
          const index = this.alquiler.indexOf(alquiler);
          if (index !== -1) {
            this.alquiler.splice(index, 1);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  sancionarCliente(idCliente: number): void {
    if (window.confirm(`¿Está seguro que desea blockear al Cliente?`)){
      this.clienteService.sancionarCliente(idCliente).subscribe(
        respuesta => {
          // Actualizar lista de ordenadores
          this.clienteService.obtenerClientes().subscribe(
            (cliente) => {
              this.cliente = cliente;
            },
            (error) => {
              console.error(error);
            }
          );
        },
        error => {
          console.log('Error al poner ordenador en mantenimiento', error);
        }
      );
    }
  }

  quitarSancion(idCliente: number): void {
    if (window.confirm(`¿Está seguro que desea desblockear al Cliente?`)){
      this.clienteService.quitarSancion(idCliente).subscribe(
        respuesta => {
          // Actualizar lista de ordenadores
          this.clienteService.obtenerClientes().subscribe(
            (cliente) => {
              this.cliente = cliente;
            },
            (error) => {
              console.error(error);
            }
          );
        },
        error => {
          console.log('Error al quitar el ordenador de mantenimiento', error);
        }
      );
    }
  } 
}
