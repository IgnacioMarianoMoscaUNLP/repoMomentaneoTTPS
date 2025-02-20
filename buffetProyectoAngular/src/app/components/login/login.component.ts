import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public dni: number = 0;
  public clave: string = '';

  constructor(private loginService: LoginService, private router:Router) {}

  login(): void {
    const completeData = {
      dni: this.dni,
      clave: this.clave,
    };

    this.loginService.postAutenticacion(completeData).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);

        // Almacenar token y rol en localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        // Redirigir a la página principal
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error:', error);
        alert('Error al iniciar sesión. Verifica tus credenciales.');
      }
    );
  }
}
