import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private authService: AuthenticationService){}

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.authService.loggedIn = true;
    }
  }
}
