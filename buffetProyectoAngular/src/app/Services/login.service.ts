import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/usuario/auth';

  constructor(private http: HttpClient) {}

  postAutenticacion(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(this.apiUrl, data, httpOptions); // Cambiado DataTransfer por data
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');    
  }
 //quitar cookies
 logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
}

}
