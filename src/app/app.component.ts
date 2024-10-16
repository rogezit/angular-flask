import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importar RouterModule


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule]  // Asegúrate de que RouterModule está importado aquí
})
export class AppComponent {}
