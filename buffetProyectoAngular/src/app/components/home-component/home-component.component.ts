import { Component } from '@angular/core';
import { LoginService } from '../../Services/login.service';
import { MenuService } from '../../Services/menu.service';
import { MenuDTO } from '../../interfaces/menu-dto';
import { CommonModule, NgFor } from '@angular/common';
import { ComidaService } from '../../Services/comida.service';
import { ComidaDTO } from '../../interfaces/comida-dto';
import { NavbarComponent } from "../navbar/navbar.component";
import { MenuCardComponent } from "../menu-card/menu-card.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [RouterLink,RouterOutlet,CommonModule, NgFor, NavbarComponent, MenuCardComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

  public menus: MenuDTO[] = [];
  public menuVegano?: MenuDTO;
  public menuNoVegano?: MenuDTO;
  public comidasVegano?: ComidaDTO[];
  public comidasNoVegano?: ComidaDTO[];

  constructor(private loginService:LoginService, private menuService:MenuService,private comidaService:ComidaService){}

  
  ngOnInit(): void {
    this.cargarMenus();
  }

  cargarMenus(): void {
      this.menuService.getMenusDia().subscribe(
      menus => {
        this.menus = menus;
          
          
          this.menuVegano = menus.find(menu => menu.tipo.toLowerCase() === 'Vegano'.toLowerCase());
          this.menuNoVegano = menus.find(menu => menu.tipo.toLowerCase() === 'No Vegano'.toLowerCase());

          this.cargarComidas();
      },
      error => {
          console.error('Error al cargar los menús:', error);
      }
  );
  }
  
  cargarComidas(): void {
    // Obtener las comidas del menú vegano
    if (!this.menuVegano || !this.menuNoVegano) {
      console.error('Los menús no están cargados');
      return;
    }
    this.comidaService.obtenerComidasMenu(this.menuVegano.comidas).subscribe(
      comidas => {
        this.comidasVegano = comidas;
      },
      error => {
        console.error('Error al cargar las comidas veganas:', error);
      }
    );

    // Obtener las comidas del menú no vegano
    this.comidaService.obtenerComidasMenu(this.menuNoVegano.comidas).subscribe(
      comidas => {
        this.comidasNoVegano = comidas;
      },
      error => {
        console.error('Error al cargar las comidas no veganas:', error);
      }
    );
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  orderMenu(menuId:number): void {
    if (this.isLoggedIn()){
        alert('menu ordenador con exito');
    }else{
      alert('Porfavor ingrese antes de ordenar un menu')
    }
  }

}