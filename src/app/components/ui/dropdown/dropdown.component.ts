import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
  imports: [NgbDropdownModule, CommonModule],
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent implements OnInit {
  @ViewChild(NgbDropdown) dropdown!: NgbDropdown;
  terapiasService = inject(TerapiaService);
  showSubmenu: string | null = null;

  terapiasList: Observable<DropdownItem[]> = new Observable();

  yo(vetn: MouseEvent, cv: NgbDropdown) {
    console.log(cv);
    // vetn.stopPropagation();
    cv.toggle();
  }

  ngOnInit(): void {
    this.terapiasList = this.terapiasService
      .getAllPersonal()
      .pipe(
        map((resp: any) => resp.data));
  }

  dropdownItems = [
    { label: 'Level 1 - Item 1' },
    { label: 'Level 1 - Item 2' },
    {
      label: 'Level 1 - Submenu',
      children: [
        { label: 'Level 2 - Item 1' },
        { label: 'Level 2 - Item 2' },
        {
          label: 'Level 2 - Submenu',
          children: [
            { label: 'Level 3 - Item 1' },
            { label: 'Level 3 - Item 2' },
          ],
        },
      ],
    },
  ];
}
