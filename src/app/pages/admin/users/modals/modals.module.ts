import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    CreateModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateModalComponent,
    // ReactiveFormsModule
  ]
})
export class UserModalsModule { }
