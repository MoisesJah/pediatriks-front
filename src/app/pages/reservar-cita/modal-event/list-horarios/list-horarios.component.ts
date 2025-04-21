import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PersonalService } from 'src/app/services/personal/personal.service';

@UntilDestroy()
@Component({
  selector: 'app-list-horarios',
  standalone: true,
  imports: [NgbNavModule, CommonModule],
  templateUrl: './list-horarios.component.html',
})
export class ListHorariosComponent implements OnInit {
  modal = inject(NgbActiveModal);
  personalService = inject(PersonalService);

  body = {
    id_personal: '',
    fecha: '',
  }

  active: number = 0;

  horarios: any[] = [];

  ngOnInit(): void {
    this.getLista();
  }

  getLista() {
    this.personalService
      .getHorariosLibre(this.body)
      .pipe(untilDestroyed(this))
      .subscribe((resp) => {
        this.horarios = resp.data;
      });
  }

  closeModal() {
    this.modal.close();
  }
}

@Component({
  selector: 'app-list-slot',
  standalone: true,
  imports: [NgbNavModule, CommonModule],
  template: `
    <div class="d-flex flex-column gap-3 px-4 py-2" style="min-width: 200px">
      <div *ngFor="let item of slot">
        <!-- <h4>Horarios para {{item.date_formatted}}</h4> -->
        <span class="fw-bold">{{item.start_time}} - {{item.end_time}}</span>
      </div>
    </div>

  `
})
export class SlotTime {
  @Input() slot: [] = [];
  constructor() { 
    console.log(this.slot);
  }
}