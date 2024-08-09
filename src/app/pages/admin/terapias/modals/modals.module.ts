import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';


@NgModule({
  declarations: [
    CreateModalComponent,
    EditModalComponent,
    DeleteModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CreateModalComponent,
    EditModalComponent
  ]
})
export class TerapiasModalsModule { }
