import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: number,
  username: string;
  email: string;
  country: string;
  state: string;
  city: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users`);
  }
}
