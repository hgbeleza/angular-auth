import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../models/AuthResponse';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  signIn(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/auth/login`, { email, password });
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/auth/me`);
  }
}
