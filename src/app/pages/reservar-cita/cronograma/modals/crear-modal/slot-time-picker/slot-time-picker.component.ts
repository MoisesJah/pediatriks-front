import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slot-time-picker',
  standalone: true,
  imports: [NgbPopoverModule, CommonModule],
  templateUrl: './slot-time-picker.component.html',
  styleUrl: './slot-time-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlotTimePickerComponent implements OnInit {
  @Output() selectedSlot = new EventEmitter();
  @Output() deleselected = new EventEmitter();

  @Input() slotTimes: Array<{ day_of_week: number; available_slots: [] }> = [];
  @Input() currentSelection: any = null; // Add this to preserve selection

  selectedItem: any;

  ngOnInit(): void {
    if (this.currentSelection) {
      this.selectedItem = this.currentSelection;
    }
  }

  selectTime(slot: string) {
    if (this.selectedItem === slot) {
      this.selectedItem = null;
    } else {
      this.selectedItem = slot;
    }
    this.selectedSlot.emit(slot);
  }

  isSelected(time:any) {
    return this.selectedItem && this.selectedItem.start_time === time.start_time 
    && this.selectedItem.end_time === time.end_time
  }

  onDeselect() {
    this.deleselected.emit();
  }
}
