import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NeuroComponent } from './neuro.component';

const routes: Routes = [{path: '', component: NeuroComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeuroRoutingModule { }
