import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule,NgOptimizedImage],
  exports: [LoginComponent],
  providers: [],
  bootstrap: [LoginComponent],
})
export class LoginModule {}
