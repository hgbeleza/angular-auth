import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth/auth.service';
import { TableComponent } from './table/table.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, TableComponent, RouterOutlet],
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedUser();
  }

  isLoggedUser() {
    this.authService.getProfile().subscribe(res => {
      this.userData = res;
    });
  }
}
