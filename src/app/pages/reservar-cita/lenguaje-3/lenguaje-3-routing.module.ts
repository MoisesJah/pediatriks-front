import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Lenguaje3Component } from './lenguaje-3.component';

const routes: Routes = [{path: '', component: Lenguaje3Component}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Lenguaje3RoutingModule { }
