import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Importar BrowserAnimationsModule
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';  // Asegúrate de que esto también está presente
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';  // Importamos las rutas

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule)  // Usa importProvidersFrom para cargar las animaciones correctamente
    ]
}).catch(err => console.error(err));
