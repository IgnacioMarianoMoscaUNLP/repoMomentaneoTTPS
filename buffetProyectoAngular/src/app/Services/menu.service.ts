import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuDTO } from '../interfaces/menu-dto';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private apiUrl = 'http://localhost:8080/menu'; // URL del backend

  constructor(private http: HttpClient) {}

  crearMenu(menu: any): Observable<any> {
    return this.http.post<MenuDTO>(this.apiUrl, menu);
  }

  getMenu(id:number):Observable<MenuDTO>{
    return this.http.get<MenuDTO>(`${this.apiUrl}/${id}`);
  }

  getMenus(): Observable<MenuDTO[]> {
    return this.http.get<MenuDTO[]>(`${this.apiUrl}/all`);
  }

  getMenusDia():Observable<MenuDTO[]>{
    return this.http.get<MenuDTO[]>(`${this.apiUrl}/day`);
  }


}
