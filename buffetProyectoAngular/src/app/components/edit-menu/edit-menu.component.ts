import { Component } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuDTO } from '../../interfaces/menu-dto';
import { ComidaDTO } from '../../interfaces/comida-dto';
import { MenuService } from '../../Services/menu.service';
import { ComidaService } from '../../Services/comida.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-menu',
  imports: [ReactiveFormsModule,NgFor,NgIf],
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
  public showSaveButton: any;
  constructor(private fb:FormBuilder,private route: ActivatedRoute,private menuService:MenuService,private comidaService:ComidaService,private router:Router) {}


  ngOnInit(){
    this.route.params.subscribe(params => {
       this.id = params['id']; 
      console.log(this.id);       
    });
    this.cargarMenu();        
    this.menuForm = this.fb.group({
      tipo: ['', Validators.required],  
      entrada: ['', ], 
      platoPrincipal: ['', Validators.required], 
      postre: ['', ],  
      bebida: ['', ],  
      dia: ['', Validators.required],
      precio:['',Validators.required]
    });
    this.menuForm.get('platoPrincipal')?.valueChanges.subscribe(() => {
      this.showSaveButton = this.menuForm.get('platoPrincipal')?.valid;
    });
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
    this.comidas = this.todasComidas.filter(ca => comidasMenuSet.has(ca.id));
    
  }

  onSubmit() {
    if (this.menuForm.valid) {
      if(!this.menu){
        console.error("error al cargar menu");
        return
      }
      

      const comidas= [
        this.menuForm.get('entrada')?.value,
        this.menuForm.get('platoPrincipal')?.value,
        this.menuForm.get('postre')?.value,
        this.menuForm.get('bebida')?.value
      ].filter(Boolean);

      this.menu.dias = this.menuForm.get('dia')?.value;
      this.menu.tipo = this.menuForm.get('tipo')?.value;
      this.menu.comidas = comidas;
      this.menu.precio = this.menuForm.get('precio')?.value;

      // Enviar el menú al servicio para ser guardado
      this.menuService.modificarMenu(this.menu).subscribe({
        next: () => alert('Menú modificado con éxito'),
        error: (err) => console.error('Error al modificar el menú:', err),
      });
    } else {
      console.log("Formulario inválido");
    }
    this.router.navigate(['/']);
  }





}
