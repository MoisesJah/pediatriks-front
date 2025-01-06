import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaPacienteComponent } from './ficha-paciente.component';

const routes: Routes = [
  {
    path: '',
    component: FichaPacienteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaPacienteRoutingModule {}
