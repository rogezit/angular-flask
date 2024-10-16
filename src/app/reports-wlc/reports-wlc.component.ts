import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule si necesitas enrutamiento aquí
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip'; // Importa TooltipModule
import { ApiService } from '../api.service'; // Importar el servicio API

@Component({
  selector: 'app-reports-wlc',
  templateUrl: './reports-wlc.component.html',
  styleUrls: ['./reports-wlc.component.css'],
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
export class ReportsWlcComponent {
  title = 'mi-proyecto-angular';

  reports: any[] = [];
  valueData: any[] = [];   // Para almacenar los datos del CSV
  csvHeaders: string[] = [];  // Para almacenar los encabezados del CSV en el orden correcto
  selectedReportForExport: any = null; // Asegúrate de declarar esto aquí
  // Inyecta el servicio ApiService en el constructor
  constructor(private apiService: ApiService) {}


  expandedData: Record<string, any[]> = {};


  servers = [
    { label: 'TMNA', value: 'S1' },
    { label: 'DC2', value: 'S2' },
    { label: 'MPIC', value: 'S3' },
    { label: 'MTM', value: 'S4' }
  ];

  // Modelos para almacenar las selecciones
  selectedServer = { value: null }; // Para el dropdown de Servers

  // Variable para controlar si se ha hecho submit
  isSubmitted = false;

  expandedRows: { [key: string]: boolean } = {};

  ngOnInit() {
    this.apiService.getVariableWlc().subscribe(
      (response) => {
        console.log('Respuesta completa del API:', response);
        // Accede a response.variable en lugar de response.reports
        if (response && response.variable) {
          this.reports = response.variable; // Asigna el arreglo de response.variable
        } else {
          this.reports = []; // En caso de que no exista, asigna un arreglo vacío
          console.warn('response.variable está indefinido o vacío:', response);
        }
        console.log('reports:', this.reports);
      },
      (error) => {
        console.error('Error al obtener la variable:', error);
      }
    );
  }

  exportCSV(filename: string): void {
    this.apiService.downloadFile(filename).subscribe(
      (blob: Blob) => {
        // Crear un enlace para descargar el archivo
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading the file', error);
      }
    );
  }

  isExportingPDF = false;  // Variable para controlar si la exportación está en progreso

  exportPDF(filename: string): void {
    if (this.isExportingPDF) {
      return;  // Si ya está exportando, salir para evitar múltiples solicitudes
    }

    this.isExportingPDF = true;  // Desactivar el botón al iniciar la exportación

    this.apiService.downloadFile(filename).subscribe(
      (blob: Blob) => {
        // Crear un enlace para descargar el archivo
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.isExportingPDF = false;  // Rehabilitar el botón después de completar la exportación
      },
      error => {
        console.error('Error downloading the file', error);
        this.isExportingPDF = false;  // Rehabilitar el botón en caso de error
      }
    );
  }

  exportPDFNoChange(filename: string): void {
    this.apiService.downloadFile(filename).subscribe(
      (blob: Blob) => {
        // Crear un enlace para descargar el archivo
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading the file', error);
      }
    );
  }

  setReportForExport(report: any, exportMenu: any, event: Event): void {
    this.selectedReportForExport = report;  // Guardar temporalmente el reporte seleccionado
    exportMenu.toggle(event);               // Abrir el menú de exportación
  }


  // Métodos para controlar la expansión y colapso de filas
  onRowExpand(event: any) {
    const report = event.data;
    this.expandedRows[report.id] = true;
  }

  onRowCollapse(event: any) {
    const report = event.data;
    delete this.expandedRows[report.id];
  }

  // Método que muestra una tabla para cada archivo
  toggleRow(report: any) {
    // Si la fila está expandida, la colapsamos
    if (this.isRowExpanded(report)) {
      delete this.expandedRows[report.id];
    } else {
      // Colapsar todas las filas antes de expandir la fila seleccionada
      this.expandedRows = {};  // Limpiar todas las filas expandidas
      this.expandedRows[report.id] = true;  // Expandir la fila seleccionada
      this.expandedData[report.id] = this.valueData;

      // Enviar el report.name al hacer clic en "View"
      this.sendReportName(report.name);
    }
  }

  // Nueva función para enviar o manejar el report.name
  sendReportName(reportName: string) {
    console.log('Report Name:', reportName);

    // Enviar el reportName al backend usando el ApiService
    this.apiService.sendReportNameToBackendWlc(reportName).subscribe(
      response => {
        console.log('Report name sent successfully, response:', response);

        // Aquí actualizamos tanto los encabezados como los datos del backend
        if (response && response.headers && Array.isArray(response.data)) {
          this.csvHeaders = response.headers;  // Guardar los encabezados en el orden correcto
          this.valueData = response.data;      // Guardar los datos
        } else {
          console.error('La respuesta no es válida:', response);
        }
      },
      error => {
        console.error('Error sending report name:', error);
      }
    );
  }

  isRowExpanded(report: any): boolean {
    return !!this.expandedRows[report.id];
  }

  // Controladores de formulario para almacenar las selecciones
  selectedCityControl = new FormControl(null);
  selectedDate: Date | null = null;



  // Función para manejar el envío de "Filters"
  submitFilters() {
    console.log("Submit Filters");

    // Imprimir la ciudad seleccionada
    const selectedCity = this.selectedCityControl.value;
    const selectedDate = this.selectedDate;

    const filterData = {
      city: selectedCity,
      date: selectedDate ? selectedDate.toISOString() : null,
    };

    // Llamar al servicio para enviar los datos al backend Flask
    this.apiService.submitFilters(filterData).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
      },
      (error) => {
        console.error('Error al enviar filtros:', error);
      }
    );
  }

  // Función para manejar el envío de "Generate Reports"
  submitGenerateReports() {
    // Establecer que se ha hecho submit
    this.isSubmitted = true;

    // Validar que ambos dropdowns tengan valores seleccionados
    if (!this.selectedServer.value) {
      // Si falta una selección, no hacer nada más (solo mostrar los bordes rojos)
      return;
    }

    console.log("Submit Generate Reports");

    // Capturar el valor seleccionado para el servidor y el reporte
    const selectedServerValue = this.selectedServer.value;
    const selectedServerLabel = this.servers.find(server => server.value === selectedServerValue)?.label;

    const reportData = {
      server: selectedServerLabel,
      report: 'wlc_ap'
    };

    console.log('Datos enviados:', reportData);

    // Resetear la variable de submit para futuras validaciones
    this.isSubmitted = false;

    // Llamar al servicio para enviar los datos al backend Flask
    this.apiService.generateReportsWlc(reportData).subscribe(
      (response) => {
        console.log('Respuesta del servidor (Generar Reportes):', response);
      },
      (error) => {
        console.error('Error al generar reportes:', error);
      }
    );
  }

}

