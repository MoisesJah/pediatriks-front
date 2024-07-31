import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservarCitaComponent } from './reservar-cita.component';

const routes: Routes = [{path: '', component: ReservarCitaComponent}]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservarCitaRoutingModule { }



