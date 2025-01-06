import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { terapistaGuard } from './guards/terapista.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'admin',
    canMatch: [adminGuard],
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'terapista',
    canMatch: [terapistaGuard],
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/terapista/terapista.module').then((m) => m.TerapistaModule),
  },
  {
    path: 'login',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'registrate',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/registrate/registrate.module').then(
        (m) => m.RegistrateModule
      ),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'paquetes',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/paquetes/paquetes.module').then(
        (m) => m.PaquetesModule
      ),
  },
  {
    path: 'fichas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/ficha-paciente/ficha-paciente.component').then(
        (m) => m.FichaPacienteComponent
      ),
  },
  {
    path: 'ficha-result/:resultId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../app/pages/terapista/fichas/fichas-result/fichas-result.component').then(
        (m) => m.FichasResultComponent
      ),
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
