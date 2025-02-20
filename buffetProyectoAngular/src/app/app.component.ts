import { Component } from '@angular/core';
import {RouterLink, RouterModule, RouterOutlet } from '@angular/router';

import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from '@angular/common';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from "./components/register/register.component";
import { ComidaComponent } from './components/comida/comida.component';
import { MenuCreationComponent } from './components/menu-creation/menu-creation.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ListMenusComponent } from './components/list-menus/list-menus.component';
import { EditMenuComponent } from './components/edit-menu/edit-menu.component';
//agregar LoginComponent
@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,RouterLink, RegisterComponent, CommonModule, RegisterComponent,
    ComidaComponent, MenuCreationComponent, LoginComponent, HttpClientModule, NavbarComponent, HomeComponentComponent,MenuCreationComponent,ListMenusComponent,EditMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'buffetProyectoAngular';
}
