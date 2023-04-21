import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Proveedor } from '../../model/proveedor';
import { PedidoCompra } from '../../model/pedidoCompra';
import { Observable } from 'rxjs';
import { Respuesta } from 'src/app/model/buscarProveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private urlProveedor = 'https://gosuelansw.ddns.net/api/v1/LanCenterSW/proveedores';
  private urlPedidoCompra = 'https://gosuelansw.ddns.net/api/v1/LanCenterSW/pedidosCompras';
  private urlReporteCompra = 'https://gosuelansw.ddns.net/api/v1/LanCenterSW/reportes/pedidoCompra'

  constructor(private http: HttpClient) { }

  registrarProveedor(proveedor: Proveedor): Observable<any> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(this.urlProveedor, proveedor, httpOptions);
  }

  obtenerProveedores(): Observable<Proveedor[]> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<Proveedor[]>(this.urlProveedor, httpOptions);
  }

  actualizarProveedor(id: number, proveedor: Proveedor): Observable<any>  {
    const url = `${this.urlProveedor}/${id}`;
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put(url, proveedor, httpOptions);
  }

  eliminarProveedor(id: number): Observable<any> {
    const url = `${this.urlProveedor}/${id}`;
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.delete(url, httpOptions);
  }
  

  registrarPedidoCompra(pedidoCompra: PedidoCompra): Observable<any> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(this.urlPedidoCompra, pedidoCompra, httpOptions);
  }

  obtenerPedidoCompra(): Observable<PedidoCompra[]> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<PedidoCompra[]>(this.urlPedidoCompra, httpOptions);
  }

  eliminarPedidoCompra(id: number): Observable<any> {
    const url = `${this.urlPedidoCompra}/${id}`;
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.delete(url, httpOptions);
  }

  mostrarReportePedidoCompra(idPedidoCompra: number): Observable<Blob> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      }),
      responseType: 'blob' as 'json'
    };
    const url = `${this.urlReporteCompra}?pedidoCompra=${idPedidoCompra}`;
    return this.http.get<Blob>(url, httpOptions);
  }

  buscarProveedor(id: number): Observable<Respuesta> {
    const url = `${this.urlProveedor}/${id}`;
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<Respuesta>(url, httpOptions);
  }
}
