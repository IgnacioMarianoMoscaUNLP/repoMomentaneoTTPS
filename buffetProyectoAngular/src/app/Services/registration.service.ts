import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:8080/usuario/new';  
  constructor(private http: HttpClient) { }

  postRegistro(data:any):Observable<any>{
   const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
   };
   return this.http.post(this.apiUrl,data,httpOptions);
  }
}
