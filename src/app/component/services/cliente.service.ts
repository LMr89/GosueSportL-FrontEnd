import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../../model/cliente';
import { Alquiler } from '../../model/alquiler';
import { Observable } from 'rxjs';
import { Respuesta } from 'src/app/model/buscarCliente';
import { OrdenadorLinea } from 'src/app/model/ordenadorLinea';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private url = 'https://gosuelansw.ddns.net/api/v1/LanCenterSW/clientes';
    private urlAlquiler = 'https://gosuelansw.ddns.net/api/v1/LanCenterSW/alquileres';
    private urlOrdenadores = 'https://gosuelansw.ddns.net/api/v1/LanCenterSW/ordenadores/online';
  
    constructor(private http: HttpClient) { }
  
    registrarCliente(cliente: Cliente): Observable<any> {
      const token = sessionStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      };
      return this.http.post(this.url, cliente, httpOptions);
    }
  
    obtenerClientes(): Observable<Cliente[]> {
      const token = sessionStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      };
      return this.http.get<Cliente[]>(this.url, httpOptions);
    }
  
    actualizarClientes(id: number, cliente: Cliente): Observable<any>  {
      const url = `${this.url}/${id}`;
      const token = sessionStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      };
      return this.http.put(url, cliente, httpOptions);
    }
  
    eliminarCliente(id: number): Observable<any> {
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

    buscarCliente(dni: number): Observable<Respuesta> {
      const url = `${this.url}/buscar/${dni}`;
      const token = sessionStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      };
      return this.http.get<Respuesta>(url, httpOptions);
    }

    registrarAlquiler(alquiler: Alquiler): Observable<any> {
      const token = sessionStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      };
      return this.http.post(this.urlAlquiler, alquiler, httpOptions);
    }
  
    obtenerAlquiler(): Observable<Alquiler[]> {
      const token = sessionStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      };
      return this.http.get<Alquiler[]>(this.urlAlquiler, httpOptions);
    }
  
    eliminarAlquiler(id: number): Observable<any> {
      const url = `${this.urlAlquiler}/${id}`;
      const token = sessionStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      };
      return this.http.delete(url, httpOptions);
    }

    ordenadoresLinea(): Observable<OrdenadorLinea[]> {
      const token = sessionStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      };
      return this.http.get<OrdenadorLinea[]>(this.urlOrdenadores, httpOptions);
    }

    sancionarCliente(id: number): Observable<any>{
      const url = `${this.url}/block/${id}?block=true`;
      const token = sessionStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      };
      return this.http.post(url, null, httpOptions);
    }
  
    quitarSancion(id: number): Observable<any>{
      const url = `${this.url}/block/${id}?block=false`;
      const token = sessionStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      };
      return this.http.post(url, null, httpOptions);
    }
  }
  