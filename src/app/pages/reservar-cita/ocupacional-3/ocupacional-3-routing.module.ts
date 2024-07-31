import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ocupacional3Component } from './ocupacional-3.component';

const routes: Routes = [{path: '', component: Ocupacional3Component}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Ocupacional3RoutingModule { }
