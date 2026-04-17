import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  
  private currentUserSubject = new BehaviorSubject<any>(null);
  // Le flux réactif (pour les pipes async dans le HTML)
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * LE CORRECTIF : Getter pour accéder à l'utilisateur de façon synchrone.
   * C'est ce qui permettra à "this.authService.currentUserValue" de fonctionner.
   */
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // --- MÉTHODES POUR L'ADMINISTRATION (LocalStorage) ---

  getAllUsers(): any[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  deleteUser(userId: string): void {
    let users = this.getAllUsers();
    users = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
    
    const current = this.currentUserSubject.value;
    if (current && current.id === userId) {
      this.logout();
    }
  }

  // --- MÉTHODES API ---

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  saveToken(token: string): void {
    window.localStorage.removeItem('auth-token');
    window.localStorage.setItem('auth-token', token);
  }

  // --- MÉTHODE DE SIMULATION ---

  loginAs(userId: string): boolean {
    if (userId) {
      const user = {
        id: userId,
        name: userId.includes('prof') ? 'Professor' : userId.includes('admin') ? 'Admin' : 'Student',
        role: userId.includes('prof') ? 'professor' : userId.includes('admin') ? 'admin' : 'student'
      };
      
      this.currentUserSubject.next(user);
      this.saveToken('fake-jwt-token-for-demo');
      return true;
    }
    return false;
  }

  getToken(): string | null {
    return window.localStorage.getItem('auth-token');
  }

  logout(): void {
    this.currentUserSubject.next(null);
    window.localStorage.removeItem('auth-token');
  }
}