import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ModalEventModule } from './pages/reservar-cita/modal-event/modal-event.module';
import { ModalEditModule } from './pages/reservar-cita/modal-event/modal-edit/modal-edit.module';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Psicologia1Component } from './pages/reservar-cita/psicologia-1/psicologia-1.component';
import { Psicologia2Component } from './pages/reservar-cita/psicologia-2/psicologia-2.component';
import { Lenguaje1Component } from './pages/reservar-cita/lenguaje-1/lenguaje-1.component';
import { Lenguaje2Component } from './pages/reservar-cita/lenguaje-2/lenguaje-2.component';
import { Lenguaje3Component } from './pages/reservar-cita/lenguaje-3/lenguaje-3.component';
import { Ocupacional1Component } from './pages/reservar-cita/ocupacional-1/ocupacional-1.component';
import { Ocupacional2Component } from './pages/reservar-cita/ocupacional-2/ocupacional-2.component';
import { Ocupacional3Component } from './pages/reservar-cita/ocupacional-3/ocupacional-3.component';
import { Fisica1Component } from './pages/reservar-cita/fisica-1/fisica-1.component';
import { Fisica2Component } from './pages/reservar-cita/fisica-2/fisica-2.component';
import { Fisica3Component } from './pages/reservar-cita/fisica-3/fisica-3.component';
import { NeuroComponent } from './pages/reservar-cita/neuro/neuro.component';
import { PediasuitComponent } from './pages/reservar-cita/pediasuit/pediasuit.component';



@NgModule({
  declarations: [
    AppComponent,
    Psicologia1Component,
    Psicologia2Component,
    Lenguaje1Component,
    Lenguaje2Component,
    Lenguaje3Component,
    Ocupacional1Component,
    Ocupacional2Component,
    Ocupacional3Component,
    Fisica1Component,
    Fisica2Component,
    Fisica3Component,
    NeuroComponent,
    PediasuitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FlatpickrModule.forRoot(),
    ModalEventModule,
    ModalEditModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
