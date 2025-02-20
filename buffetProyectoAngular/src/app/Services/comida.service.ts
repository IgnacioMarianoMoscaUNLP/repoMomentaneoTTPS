import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { ComidaDTO } from '../interfaces/comida-dto';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {
  private apiUrl = 'http://localhost:8080/comida';  
  constructor(private http: HttpClient) { }

  crearComida(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(this.apiUrl, data, httpOptions);
  }

  obtenerComidas():Observable<any>{
    return this.http.get<ComidaDTO[]>(`${this.apiUrl}/list`);
  }

  obtenerComidasMenu(comidaIds: number[]): Observable<ComidaDTO[]> {
    //
    const solicitudes: Observable<ComidaDTO>[] = [];
    console.log(comidaIds)

    
    for (const id of comidaIds) {    
      solicitudes.push(this.consultaUnaComida(id));      
    }
    //esto reseulve consultas en paralelo y las devuelve juntas en una lista
    return forkJoin(solicitudes);
  }

  private consultaUnaComida(id: number): Observable<ComidaDTO> {
    
    //const params = new HttpParams().set('id', id);
    return this.http.post<ComidaDTO>(`${this.apiUrl}/id`, id);
  }
        
}


