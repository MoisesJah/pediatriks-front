import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ocupacional1Component } from './ocupacional-1.component';

const routes: Routes = [{path: '', component: Ocupacional1Component}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Ocupacional1RoutingModule { }
