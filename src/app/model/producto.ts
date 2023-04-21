import { Proveedor } from './proveedor';
import { Categorias } from './categorias';

export class Producto {
    idProducto: number = 0;
    nombre: string = "";
    idProveedor: Proveedor = new Proveedor();
    idCategoria: Categorias = new Categorias();
    precioUnitario: string = "";
    stock: string = "";
    imgUrl: string = "";
    estado: boolean = true;
}