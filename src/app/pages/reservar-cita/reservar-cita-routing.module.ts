import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservarCitaComponent } from './reservar-cita.component';

const routes: Routes = [
  { path: '', component: ReservarCitaComponent },
  {
    path: ':tag',
    // pathMatch: 'full',
    loadComponent: () =>
      import('./cronograma/cronograma.component').then(
        (m) => m.CronogramaComponent
      ),
  },
  {
    path: ':tag/:terapist',
    loadComponent: () =>
      import('./cronograma/especialista/especialista.component').then(
        (m) => m.EspecialistaComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservarCitaRoutingModule {}
