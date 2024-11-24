import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { AlertErrorComponent } from '../components/alert-error/alert-error.component';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/AuthResponse';
import { TokenService } from '../services/token/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  msg: string = '';
  access_token: string = '';
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(
    private authService: AuthService,
    private route: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.loginForm.valid) {
      const email = this.loginForm.value.email as string;
      const password = this.loginForm.value.password as string;
      this.authService.signIn(email, password).subscribe({
        next: (response: AuthResponse) => this.onSuccess(response.access_token),
        error: (err) => {
          if(err.error) {
            this.onError(err.error.message || 'An unexpected error occurred. Please, try again later')
          }
        }
      });
    }
  }

  private onError(errMsg: string) {
    this.msg = errMsg;
    this.loginForm.reset();
    setTimeout(() => {
      this.msg = '';
    }, 5000);
  }

  private onSuccess(accessToken: string) {
    this.tokenService.setToken(accessToken);
    this.route.navigate(['home']);
  }
}
