import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';//url backend

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // AJOUTEZ CETTE MÉTHODE ICI POUR FIXER L'ERREUR
  saveToken(token: string): void {
    window.localStorage.removeItem('auth-token'); // On nettoie l'ancien token s'il existe
    window.localStorage.setItem('auth-token', token); // On enregistre le nouveau
  }
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
}

  // Optionnel : Méthode pour récupérer le token plus tard
  getToken(): string | null {
    return window.localStorage.getItem('auth-token');
  }
}