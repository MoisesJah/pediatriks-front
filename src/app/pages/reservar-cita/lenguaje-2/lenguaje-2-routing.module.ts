import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Lenguaje2Component } from './lenguaje-2.component';

const routes: Routes = [{path: '', component: Lenguaje2Component}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Lenguaje2RoutingModule { }
