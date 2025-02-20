import { Component,Input } from '@angular/core';
import { MenuDTO } from '../../interfaces/menu-dto';
import { Dias } from '../../interfaces/dias';
import { ComidaDTO } from '../../interfaces/comida-dto';
import { CommonModule,NgFor } from '@angular/common';
@Component({
  selector: 'app-menu-card',
  imports: [CommonModule,NgFor],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.css'
})
export class MenuCardComponent {
  //necesitaba poner un valor por defecto 
  @Input() menu?:MenuDTO;
  @Input()comidas?: ComidaDTO[];



  
}
   


