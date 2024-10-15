import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable } from 'rxjs';
import { Personal } from 'src/app/models/personal';
import { Terapia } from 'src/app/models/terapia';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';

interface DropdownItem {
  terapia: Terapia & { personal: Personal[] };
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  imports: [NgbDropdownModule, CommonModule, RouterLink],
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent implements OnInit {
  @ViewChild(NgbDropdown) dropdown!: NgbDropdown;
  terapiasService = inject(TerapiaService);
  showSubmenu: string | null = null;

  terapiasList: Observable<DropdownItem[]> = new Observable();

  ngOnInit(): void {
    this.terapiasList = this.terapiasService.getAllPersonal().pipe(
      map((resp: any) => [
        { link: '/admin/reservar-cita', nombre: 'Cronograma General' },
        ...resp.data.map((t:any) => ({
          link: `/admin/reservar-cita/${t.id_terapia}`,
          nombre: t.nombre,
          personal: t.personal.map((p: any) => ({
            link: `/admin/reservar-cita/${t.id_terapia}/${p.id_personal}`,	
            nombre: p.nombre
          })),
        })),
      ])
    );
  }
}
