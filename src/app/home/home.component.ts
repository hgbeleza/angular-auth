import { Component } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
     private tokenService: TokenService,
     private router: Router
    ) {}

  onLogout() {
    this.tokenService.clearToken();
    this.router.navigate(['auth/login']);
  }

  openMenu() {
    // code...
  }
}
