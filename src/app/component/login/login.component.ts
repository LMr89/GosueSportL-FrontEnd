import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  loggedIn: boolean = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  getErrorMessage(): string | null {
    return this.authService.errorMessage;
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password);
  }

  getBienvenido(): boolean | null {
    return this.authService.loading;
  }
}
