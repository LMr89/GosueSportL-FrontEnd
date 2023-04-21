import { Producto } from './producto';
import { Categorias } from './categorias';

export class PedidoCompra {
    idCompra: number = 0;
    idProducto: Producto = new Producto();
    cantidad: number = 0;
    precio: number = 0;
    idCategoria: Categorias = new Categorias();
    tipoComprabante: string = "";
    fechaRegistro: string = "";
}