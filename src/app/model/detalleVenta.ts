import { Producto } from './producto';

export class DetalleVenta {
  idDetalleVenta: number = 0;
  idProducto: Producto = new Producto();
  cantidad: number = 0;
  importe: number = 0;
  descuento: number | null = null;
}