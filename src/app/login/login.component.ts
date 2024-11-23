import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertErrorComponent } from '../components/alert-error/alert-error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  msg: string = '';
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.loginForm.valid) {
      const email = this.loginForm.value.email as string;
      const password = this.loginForm.value.password as string;
      this.authService.signIn(email, password).subscribe({
        next: () => this.onSuccess(),
        error: (err) => {
          if(err.error) {
            this.onError(err.error.message)
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

  private onSuccess() {
    // code...
  }
}
