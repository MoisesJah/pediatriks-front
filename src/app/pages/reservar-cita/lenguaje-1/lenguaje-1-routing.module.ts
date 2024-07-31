import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Lenguaje1Component } from './lenguaje-1.component';

const routes: Routes = [{path: '', component: Lenguaje1Component}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Lenguaje1RoutingModule { }
