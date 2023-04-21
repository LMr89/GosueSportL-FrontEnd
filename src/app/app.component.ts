import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/component/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProyectLanCenter';
  constructor(private AuthenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  get loggedIn(): boolean {
    return this.AuthenticationService.loggedIn;
  }

  logout() {
    this.AuthenticationService.logout();
  }
}
