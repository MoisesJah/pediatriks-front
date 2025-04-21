import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  NgbActiveModal,
  NgbModal,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { forwardRef } from '@angular/core';
import { finalize } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-list-horarios',
  standalone: true,
  imports: [NgbNavModule, CommonModule, forwardRef(() => SlotTime)],
  templateUrl: './list-horarios.component.html',
})
export class ListHorariosComponent implements OnInit {
  modal = inject(NgbActiveModal);
  isLoading = false;
  personalService = inject(PersonalService);
  @Output() selectedSlots = new EventEmitter();

  body = {
    id_personal: '',
    fecha: '',
  };

  selectedHorarios: { [date: string]: any } = {};

  active: number = 0;
  slotSelections: { [date: string]: any } = {};

  horarios: any[] = [];

  ngOnInit(): void {
    this.getLista();
  }

  onSelectedSlots(slots: any) {
    if (slots.selectedSlot) {
      this.selectedHorarios[slots.date] = slots;
      this.slotSelections[slots.date] = slots.selectedSlot;
    } else {
      delete this.selectedHorarios[slots.date];
      this.slotSelections[slots.date] = null;
    }
  }

  get selectedList() {
    return Object.values(this.selectedHorarios);
  }

  removeSlot(date: string) {
    // Remove from the list
    delete this.selectedHorarios[date];
    // Tell the slot component to deselect
    this.slotSelections[date] = null;
  }

  getLista() {
    this.isLoading = true;
    this.personalService
      .getHorariosLibre(this.body)
      .pipe(
        finalize(() => (this.isLoading = false)),
        untilDestroyed(this)
      )
      .subscribe((resp) => {
        this.horarios = resp.data;
      });
  }

  reservarHorarios() {
    this.selectedSlots.emit(this.selectedList);
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
      <span
        >Horarios disponibles <strong>{{ slot.date_formatted }}</strong></span
      >
      <div class="row gap-1">
        <div
          (click)="selectedSlot(item)"
          [class.bg-primary]="isSelected(item)"
          class="col-4 border cursor-pointer px-2 py-1 rounded"
          *ngFor="let item of slot.available_slots"
        >
          <span class="fw-bold"
            >{{ item.start_time }} - {{ item.end_time }}</span
          >
        </div>
      </div>
    </div>
  `,
})
export class SlotTime {
  @Input() slot: any = [];
  @Output() selectedSlots = new EventEmitter();
  @Input() currentSelection: any;

  selectedItem: any = null;

  isSelected(slot: any): boolean {
    return (
      this.selectedItem &&
      this.selectedItem.start_time === slot.start_time &&
      this.selectedItem.end_time === slot.end_time
    );
  }

  ngOnChanges() {
    // Sync with parent's selection state
    if (this.currentSelection === null) {
      this.selectedItem = null;
    }
  }

  selectedSlot(slot: any) {
    console.log('subitem', slot);
    if (this.selectedItem === slot) {
      this.selectedItem = null;
    } else {
      this.selectedItem = slot;
    }
    this.selectedSlots.emit({
      date: this.slot.date,
      day: this.slot.day,
      date_formatted: this.slot.date_formatted,
      selectedSlot: this.selectedItem,
    });
  }
}
