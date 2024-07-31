import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SedesComponent } from './sedes.component';
import { SedesRoutingModule } from './sedes-routing.module';


@NgModule({
  declarations: [SedesComponent],
  imports: [
    CommonModule,
    SedesRoutingModule
  ],
  exports: [SedesComponent],
  providers:[
  ],
  bootstrap:[SedesComponent],
})
export class SedesModule { }


