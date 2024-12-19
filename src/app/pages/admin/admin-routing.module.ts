import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./users/users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'terapias',
    loadComponent: () =>
      import('./terapias/terapias.component').then((m) => m.TerapiasComponent),
  },
  {
    path: 'pacientes',
    loadComponent: () =>
      import('./pacientes/pacientes.component').then(
        (m) => m.PacientesComponent
      ),
  },
  {
    path: 'personal',
    loadComponent: () =>
      import('./personal/personal.component').then((m) => m.PersonalComponent),
  },
  {
    path: 'paquetes',
    loadComponent: () =>
      import('./paquetes/paquetes.component').then((m) => m.PaquetesComponent),
  },
  {
    path: 'reservar-cita',
    loadChildren: () =>
      import('../reservar-cita/reservar-cita.module').then(
        (m) => m.ReservarCitaModule
      ),
  },
  {
    path: 'inventario',
    loadComponent: () =>
      import('./inventario/inventario.component').then(
        (m) => m.InventarioComponent),
  },
  {
    path: 'sedes',
    loadComponent: () =>
      import('./sedes/sedes.component').then((m) => m.SedesComponent),
  },
  {
    path: 'fichas',
    loadComponent: () =>
      import('./fichas/fichas.component').then((m) => m.FichasComponent),
  },
  {
    path: 'tabla-solicitudes',
    loadComponent: () =>
      import('./tabla-solicitudes/tabla-solicitudes.component').then((m) => m.TablaSolicitudesComponent),
  },
  {
    path: 'surveys',
    loadComponent: () =>
      import('./surveys/surveys.component').then((m) => m.SurveysComponent),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
