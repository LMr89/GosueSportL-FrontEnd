import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../../model/producto';
import { Categorias } from '../../model/categorias';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = 'https://gosuelansw.ddns.net/api/v1/LanCenterSW/producto';
  private urlC = 'https://gosuelansw.ddns.net/api/v1/LanCenterSW/categorias';

  constructor(private http: HttpClient) { }

  registrarProducto(producto: Producto): Observable<any> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(this.url, producto, httpOptions);
  }

  obtenerProductos(): Observable<Producto[]> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<Producto[]>(this.url, httpOptions);
  }

  actualizarProducto(id: number, producto: Producto): Observable<any>  {
    const url = `${this.url}/${id}`;
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put(url, producto, httpOptions);
  }

  eliminarProducto(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.delete(url, httpOptions);
  }

  obtenerCategorias(): Observable<Categorias[]> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<Categorias[]>(this.urlC, httpOptions);
  }

  buscarProducto(nombre: string): Observable<Producto[]> {
    const url = `${this.url}/buscar?name=${nombre}`;
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<Producto[]>(url, httpOptions);
  }
}
