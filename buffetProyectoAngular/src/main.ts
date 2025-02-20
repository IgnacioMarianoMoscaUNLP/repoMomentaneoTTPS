import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors,withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common'; // Importar módulos necesarios
import { HttpClientModule } from '@angular/common/http'; // Si usas HttpClientModule
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './app/interceptors/jwt.interceptor';
import { provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), // Proveer HttpClient con interceptores desde DI
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideZoneChangeDetection({ eventCoalescing: true }), provideAnimationsAsync()// Habilitar animaciones
  ],
}).catch((err) => console.error(err));
