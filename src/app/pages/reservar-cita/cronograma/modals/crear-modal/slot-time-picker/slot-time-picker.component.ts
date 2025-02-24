import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slot-time-picker',
  standalone: true,
  imports: [NgbPopoverModule, CommonModule],
  templateUrl: './slot-time-picker.component.html',
  styleUrl: './slot-time-picker.component.scss',
})
export class SlotTimePickerComponent {
  @Output() selectedSlot = new EventEmitter();
  @Output() deleselected = new EventEmitter();
  @Input() slotTimes: Array<{ dia_semana: number; time_slots: [] }> = [];

  selectTime(time: string) {
    this.selectedSlot.emit(time);
  }

  onDeselect() {
    this.deleselected.emit();
  }
}
