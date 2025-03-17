import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { HeaderComponent } from "../../../../components/ui/header/header.component";
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { IPaciente } from 'src/app/models/paciente';
import { InfoTabsComponent } from './info-tabs/info-tabs.component';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [CommonModule, HeaderComponent, InfoTabsComponent],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.scss'
})
export class InformacionComponent implements OnInit {
  router = inject(ActivatedRoute);
  pacienteService = inject(PacienteService);

  id_paciente = this.router.snapshot.paramMap.get('id');

  currentPaciente: IPaciente | null = null;

  ngOnInit(): void {
      this.getPaciente();
  }

  getPaciente() {
    return this.pacienteService.getById(this.id_paciente!).subscribe((resp) => {
      this.currentPaciente = resp.data;
    });
  }
}
