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
    loadChildren: () =>
      import('./citas/citas.component').then(
        (m) => m.CitasComponent
      ),
  },
  {
    path: 'inventario',
    loadComponent: () =>
      import('./inventario/inventario.component').then(
        (m) => m.InventarioComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerapistaRoutingModule {}
