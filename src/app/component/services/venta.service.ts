import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from 'src/app/model/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private url = 'https://gosuelansw.ddns.net/api/v1/LanCenterSW/ventas';
  private urlReporteVenta = 'https://gosuelansw.ddns.net/api/v1/LanCenterSW/reportes/ticketVenta'

  constructor(private http: HttpClient) { }

  registrarVenta(venta: Venta): Observable<any> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(this.url, venta, httpOptions);
  }

  obtenerVentas(): Observable<Venta[]> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<Venta[]>(this.url, httpOptions);
  }

  eliminarVentas(id: number): Observable<any> {
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

  mostrarTicketVenta(idVenta: number): Observable<Blob> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      }),
      responseType: 'blob' as 'json'
    };
    const url = `${this.urlReporteVenta}?venta=${idVenta}`;
    return this.http.get<Blob>(url, httpOptions);
  }

}
