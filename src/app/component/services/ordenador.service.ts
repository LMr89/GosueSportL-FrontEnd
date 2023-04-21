import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ordenadores } from '../../model/ordenadores';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenadorService {
  private url = 'https://gosuelansw.ddns.net/api/v1/LanCenterSW/ordenadores';
  private urlM = 'https://gosuelansw.ddns.net/api/v1/LanCenterSW/ordenadores/mantenimiento';

  constructor(private http: HttpClient) { }

  registrarOrdenador(ordenador: Ordenadores): Observable<any> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(this.url, ordenador, httpOptions);
  }

  obtenerOrdenadores(): Observable<Ordenadores[]> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<Ordenadores[]>(this.url, httpOptions);
  }

  obtenerOrdenadoresMantenimiento(): Observable<Ordenadores[]> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<Ordenadores[]>(this.urlM, httpOptions);
  }

  actualizarOrdenadores(id: number, ordenador: Ordenadores): Observable<any>  {
    const url = `${this.url}/${id}`;
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put(url, ordenador, httpOptions);
  }

  eliminarOrdenador(id: number): Observable<any> {
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

  ponerOrdenadorMantenimiento(id: number): Observable<any>{
    const url = `${this.url}/${id}?mantenimiento=true`;
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(url, null, httpOptions);
  }

  ponerOrdenadorFueraMantenimiento(id: number): Observable<any>{
    const url = `${this.url}/${id}?mantenimiento=false`;
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
