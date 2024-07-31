import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrateComponent } from './registrate.component';
import { RegistrateRoutingModule } from './registrate-routing.module';


@NgModule({
  declarations: [ RegistrateComponent],
  imports: [
    CommonModule,
    RegistrateRoutingModule
  ],
  exports: [RegistrateComponent
  ],
  providers:[
  ],
  bootstrap:[RegistrateComponent],
})
export class RegistrateModule { }



