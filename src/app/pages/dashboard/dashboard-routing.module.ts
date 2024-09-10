import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    // children: [
    //   { path: 'reservar-cita/:tag', loadChildren: () => import('../reservar-cita/reservar-cita.module').then(m => m.ReservarCitaModule) },

    //   { path: 'sedes', loadChildren: () => import('../sedes/sedes.module').then(m => m.SedesModule) },
    // ]
  },
  { path: 'reservar-cita/:tag', loadChildren: () => import('../reservar-cita/reservar-cita.module').then(m => m.ReservarCitaModule) },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
