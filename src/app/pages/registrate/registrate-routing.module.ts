import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrateComponent } from './registrate.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: RegistrateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrateRoutingModule {}
