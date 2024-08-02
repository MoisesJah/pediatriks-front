import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'registrate', loadChildren: () => import('./pages/registrate/registrate.module').then(m => m.RegistrateModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'reservar-cita', loadChildren: () => import('./pages/reservar-cita/reservar-cita.module').then(m => m.ReservarCitaModule) },
  { path: 'sedes', loadChildren: () => import('./pages/sedes/sedes.module').then(m => m.SedesModule) },
  { path: 'psicologia-1', loadChildren: () => import('./pages/reservar-cita/psicologia-1/psicologia-1.module').then(m => m.Psicologia1Module) },
  { path: 'psicologia-2', loadChildren: () => import('./pages/reservar-cita/psicologia-2/psicologia-2.module').then(m => m.Psicologia2Module) },
  { path: 'lenguaje-1', loadChildren: () => import('./pages/reservar-cita/lenguaje-1/lenguaje-1.module').then(m => m.Lenguaje1Module) },
  { path: 'lenguaje-2', loadChildren: () => import('./pages/reservar-cita/lenguaje-2/lenguaje-2.module').then(m => m.Lenguaje2Module) },
  { path: 'lenguaje-3', loadChildren: () => import('./pages/reservar-cita/lenguaje-3/lenguaje-3.module').then(m => m.Lenguaje3Module) },
  { path: 'ocupacional-1', loadChildren: () => import('./pages/reservar-cita/ocupacional-1/ocupacional-1.module').then(m => m.Ocupacional1Module) },
  { path: 'ocupacional-2', loadChildren: () => import('./pages/reservar-cita/ocupacional-2/ocupacional-2.module').then(m => m.Ocupacional2Module) },
  { path: 'ocupacional-3', loadChildren: () => import('./pages/reservar-cita/ocupacional-3/ocupacional-3.module').then(m => m.Ocupacional3Module) },
  { path: 'fisica-1', loadChildren: () => import('./pages/reservar-cita/fisica-1/fisica-1.module').then(m => m.Fisica1Module) },
  { path: 'fisica-2', loadChildren: () => import('./pages/reservar-cita/fisica-2/fisica-2.module').then(m => m.Fisica2Module) },
  { path: 'fisica-3', loadChildren: () => import('./pages/reservar-cita/fisica-3/fisica-3.module').then(m => m.Fisica3Module) },
  { path: 'neuro', loadChildren: () => import('./pages/reservar-cita/neuro/neuro.module').then(m => m.NeuroModule) },
  { path: 'pediasuit', loadChildren: () => import('./pages/reservar-cita/pediasuit/pediasuit.module').then(m => m.PediasuitModule) },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
