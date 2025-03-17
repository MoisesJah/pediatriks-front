import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [NgbAccordionModule, CommonModule,NgbCollapseModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit {
  @Input() items: any[] = [];
  @Output() selected = new EventEmitter<any[]>();

  get selectedValues(): any[] {
    return this.items.reduce((acc, group) => {
      const selectedItems = group.personal.filter((item : any) => item.checked).map((item: any) => item.id);
      return acc.concat(selectedItems);
    }, []);
  }

  ngOnInit(): void {}

  checkAll(checked: boolean) {
    this.items.forEach(item => item.checked = checked);
  }

  uncheckAll() {
    this.items.forEach(item => item.personal.forEach((person: any) => person.checked = false));
    this.selected.emit(this.selectedValues);
  }

  updateSelectedItem(item: any) {
    item.checked = !item.checked;
    this.selected.emit(this.selectedValues);
  }

  checkGroup(checked: boolean, group: any) {
    group.personal.forEach((item: any) => item.checked = checked);
    this.selected.emit(this.selectedValues);
  }

  isGroupChecked(group: any): boolean {
    return group.personal.every((item: any) => item.checked);
  }

  isGroupIndeterminate(group: any): boolean {
    return !this.isGroupChecked(group) && group.personal.some((item: any) => item.checked);
  }
}
