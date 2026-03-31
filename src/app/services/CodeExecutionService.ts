import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CodeRequest {
  code: string;
  language: string;
}

export interface CodeResponse {
  success: boolean;
  output: string | null;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class CodeExecutionService {
  private readonly apiUrl = 'http://localhost:8080/api/code/execute';

  constructor(private http: HttpClient) {}

  executeCode(request: CodeRequest): Observable<CodeResponse> {
    return this.http.post<CodeResponse>(this.apiUrl, request);
  }
}