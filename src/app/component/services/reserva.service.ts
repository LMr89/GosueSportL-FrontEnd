import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reserva } from '../../model/reserva';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private url = 'https://gosuelansw.ddns.net/api/v1/LanCenterSW/reservas';

  constructor(private http: HttpClient) { }

  obtenerReserva(): Observable<Reserva[]> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<Reserva[]>(this.url, httpOptions);
  }

  registrarReserva(reserva: Reserva): Observable<any> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(this.url, reserva, httpOptions);
  }

  actualizarReserva(id: number, reserva: Reserva): Observable<any>  {
    const url = `${this.url}/${id}`;
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put(url, reserva, httpOptions);
  }

  eliminarReserva(id: number): Observable<any> {
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
}