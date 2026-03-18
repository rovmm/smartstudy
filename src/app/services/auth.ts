import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.api}/api/auth/login`, {
      email,
      password
    });
  }

  register(fullName: string, email: string, password: string) {
    return this.http.post(`${this.api}/api/auth/register`, {
      fullName,
      email,
      password
    });
  }
}