import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RegistrateComponent } from './registrate.component';
import { RegistrateRoutingModule } from './registrate-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegistrateComponent],
  imports: [CommonModule, RegistrateRoutingModule, ReactiveFormsModule,NgOptimizedImage],
  exports: [RegistrateComponent],
  providers: [],
  bootstrap: [RegistrateComponent],
})
export class RegistrateModule {}
