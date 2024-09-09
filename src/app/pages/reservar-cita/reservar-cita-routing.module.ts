import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservarCitaComponent } from './reservar-cita.component';

const routes: Routes = [
  { path: '', component: ReservarCitaComponent },
  {
    path: ':tag',
    loadComponent: () =>
      import('./cronograma/cronograma.component').then(
        (m) => m.CronogramaComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservarCitaRoutingModule {}
