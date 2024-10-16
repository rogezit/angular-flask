import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:5000/api';  // Asegúrate de que esta URL sea la correcta

  constructor(private http: HttpClient) {}

  // Método para enviar los filtros al backend Flask
  submitFilters(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit-filters`, data);
  }

  // Método para generar reportes en el backend Flask
  generateReports(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate-reports`, data);
  }

  // Método para generar reportes en el backend Flask
  generateReportsWlc(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate-reports-wlc`, data);
  }

  // Método para obtener la variable del backend Flask
  getVariable(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-variable`);
  }

  // Método para obtener la variable del backend Flask
  getVariableWlc(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-variable-wlcap`);
  }

  // Método para enviar el reportName al backend
  sendReportNameToBackend(data: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-report-name`,
      { reportName: data },  // Envía el string en un objeto JSON
      { headers: { 'Content-Type': 'application/json' } }  // Incluye el encabezado
    );
  }

  // Método para enviar el reportName al backend
  sendReportNameToBackendWlc(data: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-report-name-wlc`,
      { reportName: data },  // Envía el string en un objeto JSON
      { headers: { 'Content-Type': 'application/json' } }  // Incluye el encabezado
    );
  }

  downloadCSV() {
    return this.http.get('/download_csv', { responseType: 'blob' });
  }

  downloadPDF() {
    return this.http.get('/download_pdf', { responseType: 'blob' });
  }
  // Método para descargar el archivo
  downloadFile(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${filename}`, { responseType: 'blob' });
  }



}
