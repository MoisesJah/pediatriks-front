import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  Query,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Personal } from 'src/app/models/personal';
import { Terapia } from 'src/app/models/terapia';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';

type DropdownItem = {
  data: Terapia & { personal: Personal[] };
};

@Component({
  selector: 'app-dropdown',
  standalone: true,
  queries: {
    viewChildren: new ViewChildren(CheckboxComponent),
  },
  templateUrl: './dropdown.component.html',
  imports: [NgbDropdownModule, CommonModule, RouterLink, CheckboxComponent],
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent implements OnInit {
  terapiasService = inject(TerapiaService);
  router = inject(Router);
  showSubmenu: string | null = null;

  selectedItems: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);

  terapiasList: Observable<DropdownItem[]> = new Observable();

  public checkBoxList: {
    nombre: string;
    personal: { nombre: string; checked: boolean; id: number }[];
  }[] = [];

  get showFilters() {
    return this.router.url === '/admin/reservar-cita';
  }

  displayFilters(terapia: any) {
    let isCronograma = terapia.nombre === 'Cronograma General';
    const isCronogramaSelected = this.router.url !== '/admin/reservar-cita' && isCronograma;
    return isCronogramaSelected;
  }

  ngOnInit(): void {
    this.terapiasList = this.terapiasService.getAllPersonal().pipe(
      map((resp: any) => [
        { link: '/admin/reservar-cita', nombre: 'Cronograma General' },
        ...resp.data.map((t: any) => ({
          link: `/admin/reservar-cita/${t.id_terapia}`,
          nombre: t.nombre,
          color: t.color,
          personal: t.personal.map((p: any) => ({
            link: `/admin/reservar-cita/${t.id_terapia}/${p.id_personal}`,
            nombre: p.nombre,
            checked: false,
            id: p.id_personal,
          })),
        })),
      ]),
      tap((resp: any) => {
        this.checkBoxList = resp.filter((item: any) => item.personal);
      })
    );
  }

  changeSelectedItems(items: []) {
    this.selectedItems.next(items);
  }
}
