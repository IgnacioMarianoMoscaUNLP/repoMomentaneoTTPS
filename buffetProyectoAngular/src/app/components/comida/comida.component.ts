import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComidaService } from '../../Services/comida.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comida',
  standalone:true,
  imports: [ReactiveFormsModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule],
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.css']
})
export class ComidaComponent {
  comidaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private comidaService: ComidaService,
    private snackBar: MatSnackBar
  ) {
    this.comidaForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.comidaForm.valid) {
      this.comidaService.crearComida(this.comidaForm.value).subscribe({
        next: (response) => {
          this.showSnackbar('¡Comida creada con éxito! Código: 200', 'Cerrar', 'success');
          console.log('Respuesta del servidor:', response);
          this.comidaForm.reset();
        },
        error: (err) => {
          const code = err.status || 500; // Código de error HTTP
          this.showSnackbar(`Error al crear comida. Código: ${code}`, 'Cerrar', 'error');
          console.error('Error del servidor:', err);
        }
      });
    } else {
      this.showSnackbar('Formulario inválido. Por favor revisa los campos.', 'Cerrar', 'warning');
    }
  }

  private showSnackbar(message: string, action: string, type: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: [`snackbar-${type}`], // Estilo dinámico según el tipo
    });
  }
}
