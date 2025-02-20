import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MenuDTO } from '../../interfaces/menu-dto';
import { ComidaDTO } from '../../interfaces/comida-dto';
import { MenuService } from '../../Services/menu.service';
import { ComidaService } from '../../Services/comida.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-menu',
  imports: [ReactiveFormsModule,CurrencyPipe],
  templateUrl: './edit-menu.component.html',
  styleUrl: './edit-menu.component.css'
})
export class EditMenuComponent {
  private id:number = -1 ;
  public menu?:MenuDTO;    
  public comidas:ComidaDTO[] = [];
  
  
  public menuForm!: FormGroup;  // Definición de formulario reactivo
  public diasSemana: string[] = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
  public totalPrecio: number = 0;  // Total que se calcula a medida que se seleccionan comidas
  public todasComidas:ComidaDTO[]=[];

  constructor(private fb:FormBuilder,private route: ActivatedRoute,private menuService:MenuService,private comidaService:ComidaService) {}


  ngOnInit(){
    this.route.params.subscribe(params => {
       this.id = params['id']; 
      console.log(this.id);       
    });
    this.cargarMenu();        
  }

  cargarMenu():void{
    this.menuService.getMenu(this.id).subscribe(
      menu=>  {
          this.menu = menu;
          this.cargarComidas();
      }, error => {
        console.error("Error al obtener menu a editar:", error);
      }
    );
  }

  cargarComidas():void{
    if(!this.menu){
      console.error("No cargo el menu");
      return 
    }
    this.comidaService.obtenerComidas().subscribe(
     foods => {
        this.todasComidas = foods;       
        this.cargarRestante();   
      }, error => {
        console.error("Error al obtener las comidas:", error);
      }
    );        
  }
  cargarRestante():void{
    if(!this.menu){
      console.error("No cargo el menu");
      return
    }
    const comidasMenuSet = new Set(this.menu.comidas);
    console.log(comidasMenuSet+"hola")
    console.log(comidasMenuSet.has(3));
    this.comidas = this.todasComidas.filter(ca => comidasMenuSet.has(ca.id));
    
  }


}
