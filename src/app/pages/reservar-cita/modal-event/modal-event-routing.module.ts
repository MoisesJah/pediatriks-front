import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalEventComponent } from './modal-event.component';

const routes: Routes = [{path: '', component: ModalEventComponent}]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalEventRoutingModule { }


