import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ModalEventModule } from './pages/reservar-cita/modal-event/modal-event.module';
import { ModalEditModule } from './pages/reservar-cita/modal-event/modal-edit/modal-edit.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { DropdownComponent } from './components/ui/dropdown/dropdown.component';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { LayoutComponent } from './components/layout/layout.component';
import { UserModalsModule } from './pages/admin/users/modals/modals.module';
import { PersonalModalsModule } from './pages/admin/personal/modales/modales.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { TerapiasModalsModule } from './pages/admin/terapias/modals/modals.module';
import { PacientesModalsModule } from './pages/admin/pacientes/modals/modals.module';
import { SedesModalsModule } from './pages/admin/sedes/modales/modales.module';
import { DrawerComponent } from './components/ui/drawer/drawer.component';
import localeEs from '@angular/common/locales/es';
import { IMAGE_CONFIG, registerLocaleData } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PaquetesComponent } from './pages/paquetes/paquetes.component';

registerLocaleData(localeEs);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FlatpickrModule.forRoot(),
    ModalEventModule,
    UserModalsModule,
    ModalEditModule,
    DropdownComponent,
    LayoutComponent,
    AdminDashboardComponent,
    PersonalModalsModule,
    NgSelectModule,
    TerapiasModalsModule,
    PacientesModalsModule,
    SedesModalsModule,
    PaquetesComponent
  ],
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor, loadingInterceptor])),
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: 'localeData', useValue: localeEs },
    { provide: IMAGE_CONFIG, useValue: { disableImageSizeWarning: true, disableImageLazyLoadWarning: true } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
