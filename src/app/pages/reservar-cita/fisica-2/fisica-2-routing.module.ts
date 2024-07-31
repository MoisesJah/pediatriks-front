import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fisica2Component } from './fisica-2.component';

const routes: Routes = [{path: '', component: Fisica2Component}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Fisica2RoutingModule { }
