import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  errorMessage: string = '';
  loading = false;
  loggedIn = false;
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }
  
  showLoadingOverlay(): void {
    this.loading = true;
    setTimeout(() => {
      const overlay = document.querySelector('.loading-overlay');
      if (overlay) {
        overlay.classList.add('fade-out'); // Wait for the fade-out animation to finish
      }
    }, 2000); // Wait for 2 seconds before hiding the overlay
  }

  login(username: string, password: string): string | null {
    let token: string | null = null;
    const loginUrl = 'https://gosuelansw.ddns.net/api/v1/LanCenterSW/auth/login';
    const credentials = {
      "nomUsuario": username,
      "password": password
    };

    this.http.post(loginUrl, credentials).subscribe(
      (response: any) => {
        const authorities = response.authorities;
        const isAdmin = authorities.some((auth: any) => auth.authority === 'ROL_USER');
        if (isAdmin) {
          token = response.token;
          this.showLoadingOverlay();
          setTimeout(() => {
            this.loggedIn = true;
            this.router.navigate(['/menu']);
          }, 1500);
          if (token !== null) {
            sessionStorage.setItem('token', token);
          }          
        } else {
          console.error('El usuario no tiene rol de administrador'); 
        }

      },
      (error: any) => {
        console.error(error);
        this.errorMessage = 'Usuario o contraseña incorrectos';
        setTimeout(() => {
          this.errorMessage = "";
        }, 2000);
      }
    );

    return token;
  }

  logout(): void {
    this.loading = false;
    this.loggedIn = false;
    this.router.navigate(['/']);
    sessionStorage.removeItem('token');
  }

  getCurrentUser(): any {
    const token = sessionStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        username: payload.username,
        role: payload.role
      };
    }
    return null;
  }
}
