import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UsuarioService } from '../services/usuario.service';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  errorMensaje: string | null = null;
  error: any;
  registrationForm!: FormGroup;
  public ingresaDatos: boolean = false;
  public registroExitoso: boolean = false;
  public contraIncorrect: boolean = false;

  public mostrarErrorNombre: boolean = false;
  public mostrarErrorApellido: boolean = false;
  public mostrarErrorUsuario: boolean = false; 
  public mostrarErrorTelefono: boolean = false;
  public mostrarErrorDni: boolean = false;
  public mostrarErrorDireccion: boolean = false;
  public mostrarErrorPassword: boolean = false;

  user: User = new User();

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.authService.loggedIn = true;
    }
    this.registrationForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      nomUsuario: ['', [Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      direccion: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]]
    });
  }
  
  onSubmit() {
    
    if (this.user.password !== this.user.confirmPassword) {
      this.contraIncorrect = true;
      setTimeout(() => {
        this.contraIncorrect = false;
      }, 2000);
      return;
    } 
    if(this.user.nombre == "" || this.user.apellido == "" || this.user.nomUsuario == "" || this.user.correo == "" || 
            this.user.telefono =="" || this.user.dni == "" || this.user.direccion == "" || this.user.password == "" || 
            this.user.confirmPassword == ""){
      this.contraIncorrect = false;  
      this.registroExitoso = false;
      this.ingresaDatos = true;
      setTimeout(() => {
      this.ingresaDatos = false;
      }, 2000);
    }

    this.usuarioService.registrarUsuario(this.user).subscribe(
      response => {
        console.log(response);
        this.registroExitoso = true;
        setTimeout(() => {
          this.registroExitoso = false;
          this.router.navigate(['/listarUsuarios']);
          }, 2000);
      },
      error => {
        console.log(error);
        this.error = error.error;

        this.mostrarErrorNombre = true;
        this.mostrarErrorApellido = true;
        this.mostrarErrorUsuario = true;
        this.mostrarErrorTelefono = true;
        this.mostrarErrorDni = true;
        this.mostrarErrorDireccion = true;
        this.mostrarErrorPassword = true;
        setTimeout(() => {
          this.mostrarErrorNombre = false;
          this.mostrarErrorApellido = false;
          this.mostrarErrorUsuario = false;
          this.mostrarErrorTelefono = false;
          this.mostrarErrorDni = false;
          this.mostrarErrorDireccion = false;
          this.mostrarErrorPassword = false;
        }, 3000);
      }      
    );
  }
}
