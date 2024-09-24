import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaquetesComponent } from './paquetes.component'; // Asegúrate de que la ruta sea correcta

const routes: Routes = [
  {
    path: '',
    component: PaquetesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaquetesRoutingModule {}
