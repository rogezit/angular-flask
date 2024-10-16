import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';  // Si estás usando PrimeNG para los dropdowns y botones.
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip'; // Importa TooltipModule
import { RouterModule } from '@angular/router'; // Importa RouterModule si necesitas enrutamiento aquí
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './sw-update-check.component.html',
  styleUrls: ['./sw-update-check.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    OverlayPanelModule,
    TableModule,
    TooltipModule,
    RouterModule
  ]
})

export class SwUpdateCheckComponent {
  cities: SelectItem[];  // Lista de opciones para el dropdown de ciudades.
  selectedCityControl: { value: string } = { value: '' };  // Controla la ciudad seleccionada.
  selectedDate: Date | null = null;  // Controla la fecha seleccionada.

  constructor() {
    // Inicializa el array de ciudades como opciones para el dropdown.
    this.cities = [
      { label: 'New York', value: 'New York' },
      { label: 'Los Angeles', value: 'Los Angeles' },
      { label: 'Chicago', value: 'Chicago' },
      { label: 'Houston', value: 'Houston' },
      { label: 'Phoenix', value: 'Phoenix' }
    ];
  }

  submitFilters() {
    // Aquí puedes manejar la lógica para enviar los filtros.
    // Puedes usar los valores de `selectedCityControl.value` y `selectedDate`.

    console.log('Selected City:', this.selectedCityControl.value);
    console.log('Selected Date and Time:', this.selectedDate);

    // Si deseas hacer algo como enviar estos valores a un servicio, puedes hacerlo aquí.
  }

}
