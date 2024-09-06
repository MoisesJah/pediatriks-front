import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalCreateEventComponent } from './modal-event.component';

const routes: Routes = [{path: '', component: ModalCreateEventComponent}]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalEventRoutingModule { }


