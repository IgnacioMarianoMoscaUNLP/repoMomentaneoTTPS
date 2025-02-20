import { Component,Input } from '@angular/core';
import { MenuDTO } from '../../interfaces/menu-dto';
import { Dias } from '../../interfaces/dias';
import { ComidaDTO } from '../../interfaces/comida-dto';
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { LoginService } from '../../Services/login.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-menu-card',
  standalone:true,
  imports: [CommonModule,NgFor,NgIf,RouterLink],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.css'
})
export class MenuCardComponent {
  //necesitaba poner un valor por defecto 
  @Input() menu?:MenuDTO;
  @Input()comidas?: ComidaDTO[];
  constructor(private loginservice:LoginService){}

  isAdmin():boolean{    
    return this.loginservice.getUserRole()==="ADMIN";
  }

  menuVale(){
    return this.menu!=null;
  }
  
}
   


