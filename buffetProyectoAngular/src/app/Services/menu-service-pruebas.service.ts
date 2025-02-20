import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuDTO } from '../interfaces/menu-dto';
import { Dias } from '../interfaces/dias';
@Injectable({
  providedIn: 'root'
})
export class MenuServicePruebasService {

  constructor() { }
  getMenusDia(): Observable<MenuDTO[]> {
    const menus: MenuDTO[] = [
        {
            idmenu: 1,
            tipo: 'Vegano',
            precio: 15,
            comidas: [1, 2],
            dias: Dias.JUEVES
        },
        {
            idmenu: 2,            
            tipo: 'No Vegano',
            precio: 20,
            comidas: [2, 3],
            dias: Dias.MARTES
        }
    ];
    return of(menus);
}
}
