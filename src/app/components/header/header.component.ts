import { Component } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  onLogout() {
    this.tokenService.clearToken();
    this.router.navigate(['auth/login']);
  }
}
