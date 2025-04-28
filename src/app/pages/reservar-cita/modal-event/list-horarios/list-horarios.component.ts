import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
  @Input() preSelections: { [date: string]: any } = {};
  @Output() selectedSlots = new EventEmitter();

  body = {
    id_personal: '',
    fecha: '',
  };

  selectedHorarios: { [date: string]: any } = {};

  active: number = 0;
  // slotSelections: { [date: string]: any } = {};

  horarios: any[] = [];

  ngOnInit(): void {
    this.getLista();

    if (this.preSelections) {
      this.selectedHorarios = {};

      // Transfer each preSelection using the date as key
      Object.values(this.preSelections).forEach((selection) => {
        if (selection.date) {
          this.selectedHorarios[selection.date] = selection;
        }
      });
    }
  }

  onSelectedSlots(slots: any) {
    if (slots.selectedSlot) {
      this.selectedHorarios[slots.date] = slots;
      // this.slotSelections[slots.date] = slots.selectedSlot;
    } else {
      delete this.selectedHorarios[slots.date];
      // this.slotSelections[slots.date] = null;
    }
  }

  get selectedList() {
    return Object.values(this.selectedHorarios);
  }

  removeSlot(date: string) {
    // Remove from the list
    delete this.selectedHorarios[date];
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
        this.horarios =
          resp.data.sort((a: any, b: any) => a.day_of_week - b.day_of_week) ||
          [];
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
    <div class="d-flex flex-column gap-3 px-4" style="min-width: 200px">
      <span class="fs-3"
        >Horarios disponibles <strong>{{ slot.date_formatted }}</strong></span
      >

      <div class="rounded border">
        <div
          *ngFor="
            let row of gridSlotTime;
            let lastRow = last;
            trackBy: trackByRow
          "
          class="row g-0"
        >
          <div
            *ngFor="let slot of row; let lastInRow = last"
            class="col-4 border-end border-bottom"
            [class.border-start]="first"
            [class.bg-light]="slot.isEmpty"
          >
            <!-- First column border and last row border handling -->
            <div
              *ngIf="!slot.isEmpty"
              class="p-3 h-100 cursor-pointer"
              [class.bg-primary]="isSelected(slot)"
              (click)="selectedSlot(slot)"
              [class.border-bottom-0]="lastRow"
              [class.border-end-0]="lastInRow"
            >
              <span *ngIf="slot.isEmpty" class="p-3 h-100 bg-light"></span>
              <span class="fw-bold"
                >{{ slot.start_time }} - {{ slot.end_time }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SlotTime implements OnInit, OnChanges {
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

  ngOnInit(): void {
    if (this.currentSelection) {
      console.log('on init', this.currentSelection);
      this.selectedItem = this.currentSelection;
    }
  }

  trackByRow(index: number, row: any[]): string {
    // console.log('row', row);
    return row
      .map((slot) => slot.id || slot.start_time || slot.end_time || 'empty')
      .join('-');
  }

  get gridSlotTime() {
    const rows = [];
    // Create a copy of the items array
    const itemsCopy = [...this.slot.available_slots];

    // Calculate how many placeholders we need to add
    const remainder = itemsCopy.length % 3;
    if (remainder > 0) {
      // Add empty placeholder items to complete the row
      const placeholdersNeeded = 3 - remainder;
      for (let i = 0; i < placeholdersNeeded; i++) {
        itemsCopy.push({ isEmpty: true });
      }
    }

    // Organize items into rows of 3
    for (let i = 0; i < itemsCopy.length; i += 3) {
      rows.push(itemsCopy.slice(i, i + 3));
    }

    return rows;
  }

  ngOnChanges(changes: SimpleChanges) {
    // Sync with parent's selection state
    if (changes['currentSelection']) {
      this.selectedItem = this.currentSelection;
      console.log(changes['currentSelection']);
    }
  }

  selectedSlot(slot: any) {
    if (this.selectedItem === slot) {
      this.selectedItem = null;
    } else {
      this.selectedItem = slot;
    }
    this.selectedSlots.emit({
      date: this.slot.date,
      day: this.slot.day,
      num_day: this.slot.day_of_week,
      date_formatted: this.slot.date_formatted,
      selectedSlot: this.selectedItem,
    });
  }
}
