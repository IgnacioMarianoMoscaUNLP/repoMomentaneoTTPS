import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComidaService } from '../../Services/comida.service';
import { MenuService } from '../../Services/menu.service';
import { CommonModule } from '@angular/common';  // Necesario para *ngFor
import { ReactiveFormsModule } from '@angular/forms';  // Para formularios reactivos

@Component({
  selector: 'app-menu-creation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],  // Importa los módulos necesarios
  templateUrl: './menu-creation.component.html',
  styleUrls: ['./menu-creation.component.css']
})
export class MenuCreationComponent implements OnInit {
  menuForm!: FormGroup;  // Definición de formulario reactivo
  comidas: any[] = [];  // Lista de comidas obtenidas del servicio
  diasSemana: string[] = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
  totalPrecio: number = 0;  // Total que se calcula a medida que se seleccionan comidas
  showSaveButton: any;

  constructor(private fb: FormBuilder, private comidaService: ComidaService, private menuService: MenuService) {}

  ngOnInit(): void {
    // Inicializa el formulario con validaciones
    this.menuForm = this.fb.group({
      tipo: ['', Validators.required],  
      entrada: ['', ], 
      platoPrincipal: ['', Validators.required], 
      postre: ['', ],  
      bebida: ['', ],  
      dia: ['', Validators.required],
      precio:['',Validators.required]
    });

    // Obtener las comidas desde el servicio
    this.comidaService.obtenerComidas().subscribe(comidas => {
      this.comidas = comidas;
    });
     // Escuchar cambios en el plato principal para mostrar el botón de guardar
     this.menuForm.get('platoPrincipal')?.valueChanges.subscribe(() => {
      this.showSaveButton = this.menuForm.get('platoPrincipal')?.valid;
    });
    
  }

  // Enviar el formulario
  onSubmit() {
    if (this.menuForm.valid) {
      const menuDTO = {
        tipo: this.menuForm.get('tipo')?.value,
        precio: this.menuForm.get('precio')?.value,
        comidas: [
          this.menuForm.get('entrada')?.value,
          this.menuForm.get('platoPrincipal')?.value,
          this.menuForm.get('postre')?.value,
          this.menuForm.get('bebida')?.value
        ].filter(Boolean),  // Filtra valores nulos o no seleccionados
        dias: this.menuForm.get('dia')?.value        
      };

      // Enviar el menú al servicio para ser guardado
      this.menuService.crearMenu(menuDTO).subscribe({
        next: () => alert('Menú creado con éxito'),
        error: (err) => console.error('Error al crear el menú:', err),
      });
    } else {
      console.log("Formulario inválido");
    }
  }
}
