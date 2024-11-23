import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  signIn(email: string, password: string) {
    return this.http.post(`${this.apiURL}/auth/login`, { email, password });
  }
}
