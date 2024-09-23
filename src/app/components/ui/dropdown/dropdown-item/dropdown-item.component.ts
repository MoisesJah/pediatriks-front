import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dropdown-item',
  standalone: true,
  imports: [NgbDropdownModule,CommonModule],
  templateUrl: './dropdown-item.component.html',
  styleUrl: './dropdown-item.component.scss'
})
export class DropdownItemComponent {
  @Input() item: any;
  @ViewChild(NgbDropdown) dropdown!: NgbDropdown;

}
