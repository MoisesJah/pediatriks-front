import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fisica3Component } from './fisica-3.component';

const routes: Routes = [{path: '', component: Fisica3Component}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Fisica3RoutingModule { }
