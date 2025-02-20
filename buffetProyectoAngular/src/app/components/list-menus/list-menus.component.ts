import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuDTO } from '../../interfaces/menu-dto';
import { MenuService } from '../../Services/menu.service';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import { MenuCardComponent } from "../menu-card/menu-card.component";
import { ComidaDTO } from '../../interfaces/comida-dto';
import { ComidaService } from '../../Services/comida.service';

export interface conjuntoMenuComidas{
  menu:MenuDTO;
  comidas:ComidaDTO[];
}

@Component({
  selector: 'app-list-menus',
  standalone:true,
  imports: [NgFor, MenuCardComponent],
  templateUrl: './list-menus.component.html',
  styleUrl: './list-menus.component.css'
})
export class ListMenusComponent {

  private Menus: MenuDTO[]  = [];
  public lista?: conjuntoMenuComidas[];

  constructor(private menuService:MenuService,private comidaService:ComidaService){}

  ngOnInit(): void {
    this.cargarMenus();
  }

  cargarMenus():void{
    this.menuService.getMenus().subscribe(
    menus=>{
        this.Menus = menus;
        this.cargarComidas();
    },
    error => {
      console.error('Error al cargar los menús:', error);
    }    
    )
  }



  cargarComidas():void{

    console.log('iniciar iteracion menus')
    for(const menu of this.Menus){

      const c: conjuntoMenuComidas = {
        menu: menu,
        comidas: [], // Inicializa comidas como un arreglo vacío
      };
      this.comidaService.obtenerComidasMenu(menu.comidas).subscribe(
        comidas => {
          
          c.comidas = comidas;
          this.lista?.push(c);
        },
        error => {
          console.error('Error al cargar las comidas veganas:', error);
        } 
      );     
    }
  }

}
