import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private apiUrl = 'http://localhost:8080/api/pdf';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  summarizePdf(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const token = this.authService.getToken();
    console.log('Token:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/summarize`, formData, { headers });
  }
}