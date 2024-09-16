import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    CreateModalComponent,
    EditModalComponent,
    DeleteModalComponent,
    ActionButtonsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgbTooltipModule,
    ClipboardModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateModalComponent,
    EditModalComponent,
    // ReactiveFormsModule
  ]
})
export class UserModalsModule { }
