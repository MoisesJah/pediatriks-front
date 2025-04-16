import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
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
import { DatePipe, IMAGE_CONFIG, registerLocaleData } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PaquetesComponent } from './pages/paquetes/paquetes.component';
import { ToastrModule } from 'ngx-toastr';
import { TerapistaModule } from './pages/terapista/terapista.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SurveysComponent } from './pages/admin/surveys/surveys.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'

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
    ToastrModule.forRoot({
      // toastClass:'toastr toastr-container',
      // positionClass:'toastr-top-right',
      // titleClass:'toastr-title',
      // messageClass:'toastr-message',
      // progressBar:true
    }), // ToastrModule added
    UserModalsModule,
    ModalEditModule,
    DropdownComponent,
    LayoutComponent,
    AdminDashboardComponent,
    PersonalModalsModule,
    NgSelectModule,
    TerapiasModalsModule,
    PacientesModalsModule,
    TerapistaModule,
    SedesModalsModule,
    DragDropModule,
    PaquetesComponent,
    SurveysComponent,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor, loadingInterceptor])),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: 'localeData', useValue: localeEs },
    { provide: IMAGE_CONFIG, useValue: { disableImageSizeWarning: true, disableImageLazyLoadWarning: true } },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
