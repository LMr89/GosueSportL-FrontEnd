import { Component, OnInit } from '@angular/core';
import { Producto } from '../../model/producto';
import { ProductoService } from '../services/producto.service';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Proveedor } from '../../model/proveedor';
import { ProveedorService } from '../services/proveedor.service';
import { Categorias } from '../../model/categorias';
import { Venta } from 'src/app/model/venta';
import { Cliente } from 'src/app/model/cliente';
import { User } from 'src/app/model/user';
import { ClienteService } from '../services/cliente.service';
import { UsuarioService } from '../services/usuario.service';
import { DetalleVenta } from 'src/app/model/detalleVenta';
import { VentaService } from '../services/venta.service';


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  nuevaVenta: Venta = new Venta();
  ventas: Venta [] = [];
  nuevoDetalleVenta: DetalleVenta = new DetalleVenta();
  clientesBloqueados: Cliente[] = [];
  usuario: User[] =[];
  proveedores: Proveedor[] = [];
  categorias: Categorias[] = [];
  producto: Producto[] = [];
  searchResults: Producto[] = [];
  productoSeleccionado: Producto | null = null;
  nuevoProducto: Producto = new Producto();
  registrationForm!: FormGroup;
  public ingresaDatos: boolean = false;
  public registroExitoso: boolean = false;
  mostrarFormularioRegistro = false;
  mostrarFormularioRegistroVenta = false;
  mostrarTicketVenta = false
  registrandoNuevoProducto = false;
  registrandoNuevaVenta = false;
  actualizarTitulo = false;
  nombreProductoBuscado: string | null = null;
  idVenta: number = 0;
  error: any;
  mostrarDetallesVenta = false;

  public mostrarErrorNombre: boolean = false;
  public mostrarErrorPrecio: boolean = false;
  public mostrarErrorStock: boolean = false; 
  public mostrarErrorImg: boolean = false;
  public mostrarError: boolean = false;

  constructor(private proveedorService: ProveedorService, private productoService: ProductoService, 
    private formBuilder: FormBuilder, private router: Router,private authService: AuthenticationService,
    private clienteService: ClienteService, private usuarioService: UsuarioService, private ventaService: VentaService) { 
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.authService.loggedIn = true;
    }
    this.productoService.obtenerProductos().subscribe(
      (producto) => {
        this.producto = producto;
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
    this.proveedorService.obtenerProveedores().subscribe(
      (proveedores) => {
      this.proveedores = proveedores;
      },
      (error) => {
      console.error(error);
      }
    );
    setInterval(() => {
      this.clienteService.obtenerClientes().subscribe(
        (clientes) => {
          this.clientesBloqueados = clientes.filter((cliente) => !cliente.esBloqueado);
        },
        (error) => {
          console.error(error);
        }
      );
    }, 1500);
    this.usuarioService.obtenerUsuarios().subscribe(
      (usuario) => {
      this.usuario = usuario;
      },
      (error) => {
      console.error(error);
      }
    );
    this.ventaService.obtenerVentas().subscribe(
      (ventas) => {
      this.ventas = ventas;
      },
      (error) => {
      console.error(error);
      }
    );

    this.registrationForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      idProveedor: ['', Validators.required],
      idCategoria: ['', [Validators.required]],
      precioUnitario: ['', [Validators.required]],
      stock: ['', Validators.required],
      imgUrl: ['', Validators.required]
    });
  }

  onSubmit() {
    this.productoService.registrarProducto(this.nuevoProducto).subscribe(
      response => {
        console.log(response);
        this.registroExitoso = true;
        this.productoService.obtenerProductos().subscribe((productos) => {
          this.producto = productos;
        });
        setTimeout(() => {
          this.registroExitoso = false;
          this.mostrarFormularioRegistro = false;
          }, 2000);
      },
      error => {
        console.log(error);
        this.error = error.error;

        this.mostrarErrorNombre = true;
        this.mostrarErrorPrecio = true;
        this.mostrarErrorStock = true;
        this.mostrarErrorImg = true;
        setTimeout(() => {
          this.mostrarErrorNombre = false;
          this.mostrarErrorPrecio = false;
          this.mostrarErrorStock = false;
          this.mostrarErrorImg = false;
        }, 3000);
      }   
    );
  }

  mostrarFormularioEditar(producto: Producto) {
    this.productoSeleccionado = producto;
  }

  onCancelar(){
    this.productoSeleccionado = null
    this.productoService.obtenerProductos().subscribe(
      (producto) => {
        this.producto = producto;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminarProducto(producto: Producto) {
    if (window.confirm(`¿Está seguro que desea eliminar el producto ${producto.nombre}?`)) {
      this.productoService.eliminarProducto(producto.idProducto).subscribe(
        () => {
          const index = this.producto.indexOf(producto);
          if (index !== -1) {
            this.producto.splice(index, 1);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  actualizarProducto() {
    if (this.productoSeleccionado) {
      this.productoService.actualizarProducto(this.productoSeleccionado.idProducto, this.productoSeleccionado).subscribe(
        (productoActualizado) => {
          // Actualizar el producto en la lista de productos
          const index = this.producto.findIndex(u => u.idProducto === productoActualizado.idProducto);
          if (index !== -1) {
            this.producto[index] = productoActualizado;
          }
          this.productoService.obtenerProductos().subscribe((productos) => {
            this.producto = productos;
          });
          // Reiniciar el formulario de edición
          this.productoSeleccionado = null;
          this.nuevoProducto = new Producto();
        },
        error => {
          console.log(error);
          this.error = error.error;
  
          this.mostrarErrorNombre = true;
          this.mostrarErrorPrecio = true;
          this.mostrarErrorStock = true;
          this.mostrarErrorImg = true;
          setTimeout(() => {
            this.mostrarErrorNombre = false;
            this.mostrarErrorPrecio = false;
            this.mostrarErrorStock = false;
            this.mostrarErrorImg = false;
          }, 3000);
        }  
      );
    }
  }

  agregarProducto(): void {
    if (!this.nuevoDetalleVenta.idProducto) {
      return;
    }
    this.nuevaVenta.detalleVentas.push(this.nuevoDetalleVenta);
    this.nuevoDetalleVenta = new DetalleVenta();
    this.mostrarDetallesVenta = true;
  }  

  registrarVenta(): void {
    this.ventaService.registrarVenta(this.nuevaVenta).subscribe(
      response => {
        console.log('Venta registrada exitosamente', response);
        this.registroExitoso = true;
        this.ventaService.obtenerVentas().subscribe((venta) => {
          this.ventas = venta;
        });
        setTimeout(() => {
          this.registroExitoso = false;
          this.mostrarFormularioRegistroVenta = false;
        }, 2000);
      },
      error => {
        console.log(error);
        const mensajeError = error.error.errores[0];
        alert(mensajeError);
      }  
    );
  }

  eliminarVenta(venta: Venta){
    if (window.confirm(`¿Está seguro que desea anular la venta N°${venta.idVenta}?`)) {
      this.ventaService.eliminarVentas(venta.idVenta).subscribe(
        () => {
          const index = this.ventas.indexOf(venta);
          if (index !== -1) {
            this.ventas.splice(index, 1);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  generarTicketVenta(idVenta: number) {
    this.ventaService.mostrarTicketVenta(idVenta).subscribe((data: any) => {
      const blob = new Blob([data], {type: 'application/pdf'});
      const url = URL.createObjectURL(blob);
      const iframe = document.getElementById('ticket-iframe') as HTMLIFrameElement;
      iframe.setAttribute('src', url);
    }, error => {
      console.log(error);
    });
  }

  buscarProductoPorNombre() {
    if (this.nombreProductoBuscado) {
      this.productoService.buscarProducto(this.nombreProductoBuscado).subscribe(
        (producto) => {
          this.searchResults = producto;
          console.log("producto encontrado", producto)
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.searchResults = [];
    }
  } 

  convertirFecha(fechaStr: string): Date {
    const anio = fechaStr.slice(0, 4);
    const mes = fechaStr.slice(4, 6);
    const dia = fechaStr.slice(6, 8);
    const hora = fechaStr.slice(8, 10);
    const minutos = fechaStr.slice(10, 12);
    const segundos = fechaStr.slice(12, 14);
    return new Date(`${anio}-${mes}-${dia}T${hora}:${minutos}:${segundos}`);
  }
}
