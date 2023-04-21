import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from 'src/app/model/buscarUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'https://gosuelansw.ddns.net/api/v1/LanCenterSW/usuarios';

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: User): Observable<any> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(this.url, usuario, httpOptions);
  }

  obtenerUsuarios(): Observable<User[]> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<User[]>(this.url, httpOptions);
  }
 
  eliminarUsuario(id: number): Observable<any> {
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

  editarUsuario(id: number, usuario: User): Observable<any> {
    const url = `${this.url}/${id}`;
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put(url, usuario, httpOptions);
  }

  buscarUsuario(id: number): Observable<Respuesta> {    
    const url = `${this.url}/${id}`;
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