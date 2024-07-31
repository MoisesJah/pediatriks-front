import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PediasuitComponent } from './pediasuit.component';

const routes: Routes = [{path: '', component: PediasuitComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PediasuitRoutingModule { }
