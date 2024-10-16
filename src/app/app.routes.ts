import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportApdfsComponent } from './report-apdfs/report-apdfs.component';
import { ReportsWlcComponent } from './reports-wlc/reports-wlc.component';
import { SwUpdateCheckComponent } from './sw-update-check/sw-update-check.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/sw-update-check', pathMatch: 'full' },  // Redirige la raíz a SW Update Check
  { path: 'http://127.0.0.1:5000', redirectTo: 'http://127.0.0.1:5000', pathMatch: 'full' },  // Redirige la raíz a SW Update Check
  { path: 'http://127.0.0.1:5000', component: SwUpdateCheckComponent },   // Página principal ahora es SW Update Check
  { path: 'report-apdfs', component: ReportApdfsComponent },
  { path: 'reports-wlc', component: ReportsWlcComponent },
  { path: 'home', component: HomeComponent },  // Ruta para Home si la quieres mantener
  { path: '**', redirectTo: 'http://127.0.0.1:5000' }  // Redirige cualquier ruta no encontrada a SW Update Check
];
