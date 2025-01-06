import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'citas',
    loadComponent: () =>
      import('./citas/citas.component').then((m) => m.CitasComponent),
  },
  {
    path: 'inventario',
    loadComponent: () =>
      import('./inventario/inventario.component').then(
        (m) => m.InventarioComponent
      ),
  },
  {
    path: ':sesionId/:surveyId',
    pathMatch: 'full',
    loadComponent: () =>
      import('../admin/surveys/survey/survey.component').then(
        (m) => m.SurveyComponent
      ),
  },
  {
    path: 'fichas',
    // pathMatch: 'full',
    loadComponent: () =>
      import('./fichas/fichas.component').then((m) => m.FichasComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerapistaRoutingModule {}
