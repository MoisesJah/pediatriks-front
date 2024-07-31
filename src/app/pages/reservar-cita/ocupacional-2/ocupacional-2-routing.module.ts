import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ocupacional2Component } from './ocupacional-2.component';

const routes: Routes = [{path: '', component: Ocupacional2Component}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Ocupacional2RoutingModule { }
