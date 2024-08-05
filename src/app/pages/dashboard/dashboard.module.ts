import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterOutlet],
  providers: [],
  // bootstrap: [DashboardComponent],
})
export class DashboardModule {}
