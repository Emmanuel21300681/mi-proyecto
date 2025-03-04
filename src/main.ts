import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Asegúrate de que routes esté correctamente importado

// Inicializar la aplicación con el enrutador
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes) // Configura el enrutador con las rutas definidas
  ]
}).catch(err => console.error(err));
