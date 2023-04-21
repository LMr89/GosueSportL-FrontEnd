import { Component, ChangeDetectorRef  } from '@angular/core';
import { Ordenadores } from '../../model/ordenadores';
import { Reserva } from '../../model/reserva';
import { Cliente } from '../../model/cliente';
import { User } from '../../model/user';
import { OrdenadorService } from '../services/ordenador.service';
import { ReservaService } from '../services/reserva.service';
import { ClienteService } from '../services/cliente.service';
import { UsuarioService } from '../services/usuario.service';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent {
  myProperty: boolean = false;
  clientes: Cliente[] =[];
  usuarios: User[] = [];
  ordenadores: Ordenadores[] = [];
  mantenimiento: Ordenadores[] = [];
  reservas: Reserva[] = [];
  searchResults: Ordenadores[] = [];
  ordenadorSeleccionado: Ordenadores | null = null;
  reservaSeleccionada: Reserva | null = null;
  nuevoOrdenador: Ordenadores = new Ordenadores();
  nuevaReserva: Reserva = new Reserva();
  registrationFormOrdenador!: FormGroup;
  registrationFormReserva!: FormGroup;
  public registroExitoso: boolean = false;
  mostrarRegistroOrdenador = false;
  mostrarRegistroReservas = false;
  actualizarTituloOrdenador = false;
  registrandoNuevoOrdenador = false;
  actualizarTituloReserva = false;
  registrandoNuevaReserva = false;
  error: any;
  public mostrarMensaje: boolean = false;

  public mostrarErrorNombre: boolean = false;
  public mostrarErrorCaracteristicas: boolean = false;
  public mostrarErrorIp: boolean = false; 
  public mostrarErrorDireccionMac: boolean = false;
  public mostrarErrorFecha: boolean = false;



  constructor(private ordenadorService: OrdenadorService, private formBuilder: FormBuilder, private router: Router,
    private authService: AuthenticationService, private reservaService: ReservaService, private clienteService: ClienteService,
    private usuarioService: UsuarioService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.myProperty = true;
      this.cdRef.detectChanges();
    }, 1000);
    if (sessionStorage.getItem('token')) {
      this.authService.loggedIn = true;
    }

    setInterval(() => {
      this.ordenadorService.obtenerOrdenadores().subscribe(
        (ordenador) => {
          this.ordenadores = ordenador;
        },
        (error) => {
          console.error(error);
        }
      );
    }, 1500);

    setInterval(() => {
      this.ordenadorService.obtenerOrdenadoresMantenimiento().subscribe(
        (mantenimiento) => {
          this.mantenimiento = mantenimiento;
        },
        (error) => {
          console.error(error);
        }
      );
    }, 1500);

    this.reservaService.obtenerReserva().subscribe(
      (reservas) => {
        this.reservas = reservas;
        this.reservas = reservas.filter(reserva => reserva.estado);
      },
      (error) => {
        console.error(error);
        this.error = error.error;
        this.mostrarMensaje = true;
      }
    );

    this.clienteService.obtenerClientes().subscribe(
      (clientes) => {
        this.clientes = clientes;
      },
      (error) => {
        console.error(error);
      }
    );
    
    this.usuarioService.obtenerUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error(error);
      }
    );

    this.registrationFormOrdenador = this.formBuilder.group({
      nomDispositivo: ['', Validators.required],
      caracteristicas: ['', Validators.required],
      ipOrdenador: ['', Validators.required],
      direccionMac: ['', [Validators.required]],
      numOrdenador: ['', [Validators.required]],
      mantenimiento: ['', Validators.required],
      estado: ['', Validators.required]
    });

    this.registrationFormReserva = this.formBuilder.group({
      fechaInicio: ['', Validators.required],
      tiempo: ['', Validators.required],
      idOrdenador: ['', Validators.required],
      cliente: ['', [Validators.required]],
      idUsuario: ['', [Validators.required]],
      monto: ['', Validators.required]
    });
  }

  registrarOrdenador() {
    this.ordenadorService.registrarOrdenador(this.nuevoOrdenador).subscribe(
      response => {
        console.log(response);
        this.registroExitoso = true;
        this.ordenadorService.obtenerOrdenadores().subscribe(
          (ordenador) => {
            this.ordenadores = ordenador;
          },
          (error) => {
            console.error(error);
          }
        );
        setTimeout(() => {
          this.registroExitoso = false;
          this.mostrarRegistroOrdenador = false;
          }, 2000);
      },
      error => {
        console.log(error);
        this.error = error.error;

        this.mostrarErrorNombre = true;
        this.mostrarErrorCaracteristicas = true;
        this.mostrarErrorIp = true;
        this.mostrarErrorDireccionMac = true;
        setTimeout(() => {
          this.mostrarErrorNombre = false;
          this.mostrarErrorCaracteristicas = false;
          this.mostrarErrorIp = false;
          this.mostrarErrorDireccionMac = false;
        }, 3000);
      }
    );
  }

  mostrarEditarOrdenador(ordenador: Ordenadores) {
    this.ordenadorSeleccionado = ordenador;
  }

  eliminarOrdenador(ordenador: Ordenadores) {
    if (window.confirm(`¿Está seguro que desea eliminar el ordenador Nro ${ordenador.numOrdenador}: ${ordenador.nomDispositivo}?`)) {
      this.ordenadorService.eliminarOrdenador(ordenador.idOrdenador).subscribe(
        () => {
          const index = this.ordenadores.indexOf(ordenador);
          if (index !== -1) {
            this.ordenadores.splice(index, 1);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  actualizarOrdenadores() {
    if (this.ordenadorSeleccionado) {
      this.ordenadorService.actualizarOrdenadores(this.ordenadorSeleccionado.idOrdenador, this.ordenadorSeleccionado).subscribe(
        (ordenadorActualizado) => {
          // Actualizar el usuario en la lista de usuarios
          const index = this.ordenadores.findIndex(u => u.idOrdenador === ordenadorActualizado.idOrdenador);
          if (index !== -1) {
            this.ordenadores[index] = ordenadorActualizado;
          }
          // Reiniciar el formulario de edición
          this.ordenadorSeleccionado = null;
          this.nuevoOrdenador = new Ordenadores();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  registrarReserva() {
    this.reservaService.registrarReserva(this.nuevaReserva).subscribe(
      response => {
        console.log(response);
        this.registroExitoso = true;
        this.reservaService.obtenerReserva().subscribe(
          (reservas) => {
            this.reservas = reservas;
            this.reservas = reservas.filter(reserva => reserva.estado);
          },
          (error) => {
            console.error(error);
            this.error = error.error;
            this.mostrarMensaje = true;
          }
        );
        setTimeout(() => {
          this.registroExitoso = false;
          this.mostrarRegistroReservas = false;
          }, 2000);
      },
      error => {
        console.log(error);
        this.error = error.error;

        this.mostrarErrorFecha = true;
        setTimeout(() => {
          this.mostrarErrorFecha = false;
        }, 3000);
        const mensajeError = error.error.errores[0];
        alert(mensajeError);
      }
    );
  }
  
  mostrarEditarReserva(reserva: Reserva) {
    this.reservaSeleccionada = reserva;
  }

  eliminarReserva(reserva: Reserva) {
    if (window.confirm(`¿Está seguro que desea eliminar la reserva Nro: ${reserva.idReserva}?`)) {
      this.reservaService.eliminarReserva(reserva.idReserva).subscribe(
        () => {
          const index = this.reservas.indexOf(reserva);
          if (index !== -1) {
            this.reservas.splice(index, 1);
            this.reservaService.obtenerReserva().subscribe(
              (reservas) => {
                this.reservas = reservas;
                this.reservas = reservas.filter(reserva => reserva.estado);
              },
              (error) => {
                console.error(error);
              }
            );
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  actualizarReservas() {
    if (this.reservaSeleccionada) {
      this.reservaService.actualizarReserva(this.reservaSeleccionada.idReserva, this.reservaSeleccionada).subscribe(
        (reservaActualizada) => {
          // Actualizar la reserva en la lista de reservas
          const index = this.reservas.findIndex(u => u.idReserva === reservaActualizada.idReserva);
          if (index !== -1) {
            this.reservas[index] = reservaActualizada;
          }
          // Reiniciar el formulario de edición
          this.reservaSeleccionada = null;
          this.nuevaReserva = new Reserva();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  ponerOrdenadorMantenimiento(idOrdenador: number): void {
    if (window.confirm(`¿Está seguro que desea poner en mantenimiento el ordenador?`)){
      this.ordenadorService.ponerOrdenadorMantenimiento(idOrdenador).subscribe(
        respuesta => {
          // Actualizar lista de ordenadores
          this.ordenadorService.obtenerOrdenadores().subscribe(
            (ordenadores) => {
              this.ordenadores = ordenadores;
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

  ponerOrdenadorFueraMantenimiento(idOrdenador: number): void {
    if (window.confirm(`¿Está seguro que desea quitar el ordenador del mantenimiento?`)){
      this.ordenadorService.ponerOrdenadorFueraMantenimiento(idOrdenador).subscribe(
        respuesta => {
          // Actualizar lista de ordenadores
          this.ordenadorService.obtenerOrdenadoresMantenimiento().subscribe(
            (mantenimiento) => {
              this.mantenimiento = mantenimiento;
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

