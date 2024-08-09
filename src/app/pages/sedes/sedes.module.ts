import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SedesComponent } from './sedes.component';
import { SedesRoutingModule } from './sedes-routing.module';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';


@NgModule({
  declarations: [SedesComponent],
  imports: [
    CommonModule,
    SedesRoutingModule,
    HeaderComponent
  ],
  exports: [SedesComponent],
  providers:[
  ],
  bootstrap:[SedesComponent],
})
export class SedesModule { }


