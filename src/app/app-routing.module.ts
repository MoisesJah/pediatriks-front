import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'admin',   loadChildren: ()=> import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: 'login',  loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'registrate', loadChildren: () => import('./pages/registrate/registrate.module').then(m => m.RegistrateModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
