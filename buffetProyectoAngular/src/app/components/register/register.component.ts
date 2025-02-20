import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../Services/registration.service';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  imports: [ MatInputModule,
    MatCardModule,MatButtonModule,MatIconModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
  ) {
    this.registrationForm = this.fb.group({
      dni: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      repetirClave: ['', [Validators.required]],
      foto: [null]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      // Simulación de ajuste de datos
      const payload = {
        dni: formData.dni,
        nombres: formData.nombres,
        apellido: formData.apellido,
        email: formData.email,
        foto: null,
        clave: formData.clave
      };

      this.registrationService.postRegistro(payload).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          alert('Usuario registrado correctamente');
        },
        error: (err) => {
          console.error('Error al registrar:', err);
          alert('Error al registrar usuario');
        }
      });
    }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Foto seleccionada:', file);
      this.registrationForm.patchValue({
        foto: file
      });
    }
  }
  
}
