import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token/token.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthService } from '../services/auth/auth.service';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userData: User = {
    username: '',
    city: '',
    country: '',
    email: '',
    state: ''
  }

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedUser();
  }

  isLoggedUser() {
    this.authService.getProfile().subscribe(res => {
      this.userData = res;
    });
  }

  onLogout() {
    this.tokenService.clearToken();
    this.router.navigate(['auth/login']);
  }

  openMenu() {
    // code...
  }
}
