import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fisica1Component } from './fisica-1.component';

const routes: Routes = [{path: '', component: Fisica1Component}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Fisica1RoutingModule { }
