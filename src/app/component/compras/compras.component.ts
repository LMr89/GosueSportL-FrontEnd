import { Component } from '@angular/core';
import { Proveedor } from '../../model/proveedor';
import { PedidoCompra } from '../../model/pedidoCompra';
import { ProveedorService } from '../services/proveedor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from '../services/producto.service';
import { Categorias } from 'src/app/model/categorias';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  registrandoNuevoProveedor = false;
  actualizarTitulo = false;
  pedidoCompraId: number = 0;
  productos: Producto[] = [];
  proveedor: Proveedor[] = [];
  categorias: Categorias[] = [];
  pedido: PedidoCompra[] = [];
  searchResults: Proveedor[] = [];
  proveedorSeleccionado: Proveedor | null = null;
  compraSeleccionada: PedidoCompra | null = null;
  nuevoProveedor: Proveedor = new Proveedor();
  nuevoPedido: PedidoCompra = new PedidoCompra();
  registrationForm!: FormGroup;
  public ingresaDatos: boolean = false;
  public registroExitoso: boolean = false;
  mostrarRegistroProveedor = false;
  mostrarFormularioRegistro = false;
  mostrarReporteCompra = false;
  registrandoNuevoPedido = false;
  idProveedorBuscado: number | null = null;

  error: any;
  public mostrarErrorNombre: boolean = false;
  public mostrarErrorContacto: boolean = false;
  public mostrarErrorDireccion: boolean = false; 
  public mostrarErrorTelefono: boolean = false;
  public mostrarErrorPagina: boolean = false;
  public mostrarErrorComprobante: boolean = false;

  constructor(private proveedorService: ProveedorService, private formBuilder: FormBuilder, private router: Router,
    private authService: AuthenticationService, private productoService: ProductoService, private http: HttpClient) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.authService.loggedIn = true;
    }
    this.proveedorService.obtenerProveedores().subscribe(
      (proveedor) => {
        this.proveedor = proveedor;
      },
      (error) => {
        console.error(error);
      }
    );

    if (sessionStorage.getItem('token')) {
      this.authService.loggedIn = true;
    }
    this.proveedorService.obtenerPedidoCompra().subscribe(
      (pedido) => {
        this.pedido = pedido;
      },
      (error) => {
        console.error(error);
      }
    );
    if (sessionStorage.getItem('token')) {
      this.authService.loggedIn = true;
    }
    this.productoService.obtenerProductos().subscribe(
      (producto) => {
        this.productos = producto;
      },
      (error) => {
        console.error(error);
      }
    );
    this.productoService.obtenerCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error(error);
      }
    );

    this.registrationForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      nomContacto: ['', Validators.required],
      direccion: ['', [Validators.required]],
      region: ['', [Validators.required]],
      telefono: ['', Validators.required],
      paginaWeb: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.nuevoProveedor.nombre == "" || this.nuevoProveedor.nomContacto == "" || this.nuevoProveedor.direccion == "" || 
        this.nuevoProveedor.region == "" || this.nuevoProveedor.telefono =="" || this.nuevoProveedor.paginaWeb == "" ){
      this.registroExitoso = false;
      this.ingresaDatos = true;
      setTimeout(() => {
      this.ingresaDatos = false;
      }, 2000);
    }

    this.proveedorService.registrarProveedor(this.nuevoProveedor).subscribe(
      response => {
        console.log(response);
        this.registroExitoso = true;
        this.proveedorService.obtenerProveedores().subscribe((proveedor) => {
          this.proveedor = proveedor;
        });
        setTimeout(() => {
          this.registroExitoso = false;
          this.mostrarRegistroProveedor = false;
          }, 2000);
      },
      error => {
        console.log(error);
        this.error = error.error;

        this.mostrarErrorNombre = true;
        this.mostrarErrorContacto = true;
        this.mostrarErrorDireccion = true;
        this.mostrarErrorTelefono = true;
        this.mostrarErrorPagina = true;
        setTimeout(() => {
          this.mostrarErrorNombre = false;
          this.mostrarErrorContacto = false;
          this.mostrarErrorDireccion = false;
          this.mostrarErrorTelefono = false;
          this.mostrarErrorPagina = false;
        }, 3000);
      } 
    );
  }

  mostrarFormularioEditar(proveedor: Proveedor) {
    this.proveedorSeleccionado = proveedor;
  }

  onCancelar(){
    this.proveedorSeleccionado = null
    this.proveedorService.obtenerProveedores().subscribe(
      (proveedor) => {
        this.proveedor = proveedor;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminarProveedor(proveedor: Proveedor) {
    if (window.confirm(`¿Está seguro que desea eliminar al usuario ${proveedor.nombre}: ${proveedor.nomContacto}?`)) {
      this.proveedorService.eliminarProveedor(proveedor.idProveedor).subscribe(
        () => {
          const index = this.proveedor.indexOf(proveedor);
          if (index !== -1) {
            this.proveedor.splice(index, 1);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  actualizarProveedor() {
    if (this.proveedorSeleccionado) {
      this.proveedorService.actualizarProveedor(this.proveedorSeleccionado.idProveedor, this.proveedorSeleccionado).subscribe(
        (proveedorActualizado) => {
          // Actualizar el usuario en la lista de usuarios
          const index = this.proveedor.findIndex(u => u.idProveedor === proveedorActualizado.idProveedor);
          if (index !== -1) {
            this.proveedor[index] = proveedorActualizado;
          }
          // Reiniciar el formulario de edición
          this.proveedorSeleccionado = null;
          this.nuevoProveedor = new Proveedor();
        },
        error => {
          console.log(error);
          this.error = error.error;
  
          this.mostrarErrorNombre = true;
          this.mostrarErrorContacto = true;
          this.mostrarErrorDireccion = true;
          this.mostrarErrorTelefono = true;
          this.mostrarErrorPagina = true;
          setTimeout(() => {
            this.mostrarErrorNombre = false;
            this.mostrarErrorContacto = false;
            this.mostrarErrorDireccion = false;
            this.mostrarErrorTelefono = false;
            this.mostrarErrorPagina = false;
          }, 3000);
        } 
      );
    }
  }

  registrarPedido(): void {
    this.proveedorService.registrarPedidoCompra(this.nuevoPedido).subscribe(
      response => {
        console.log(response);
        this.registroExitoso = true;
        this.proveedorService.obtenerPedidoCompra().subscribe((pedido) => {
          this.pedido = pedido;
        });
        setTimeout(() => {
          this.registroExitoso = false;
          this.mostrarFormularioRegistro = false;
        }, 2000);
      },
      error => {
        console.log(error);
        this.error = error.error;
        if(error.error.tipoComprabante){
          this.mostrarErrorComprobante = true;
          setTimeout(() => {
            this.mostrarErrorComprobante = false;
          }, 3000);
        }
        const mensajeError = error.error.errores[0];
        alert(mensajeError);
      } 
    );
  }

  eliminarPedido(pedido: PedidoCompra) {
    if (window.confirm(`¿Está seguro que desea eliminar el pedido N°${pedido.idCompra}?`)) {
      this.proveedorService.eliminarPedidoCompra(pedido.idCompra).subscribe(
        () => {
          const index = this.pedido.indexOf(pedido);
          if (index !== -1) {
            this.proveedor.splice(index, 1);
          }
          this.ngOnInit();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
  generarReporteCompra(pedidoCompraId: number) {
    this.proveedorService.mostrarReportePedidoCompra(pedidoCompraId).subscribe((data: any) => {
      const blob = new Blob([data], {type: 'application/pdf'});
      const url = URL.createObjectURL(blob);
      const iframe = document.getElementById('reporte-iframe') as HTMLIFrameElement;
      iframe.setAttribute('src', url);
    }, error => {
      console.log(error);
    });
  }
  
  buscarProveedorPorId() {
    if (this.idProveedorBuscado) {
      this.proveedorService.buscarProveedor(this.idProveedorBuscado).subscribe(
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
}
