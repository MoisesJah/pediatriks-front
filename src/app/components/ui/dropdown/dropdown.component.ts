import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  imports: [NgbDropdownModule, CommonModule],
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @ViewChild(NgbDropdown) dropdown!: NgbDropdown;

  yo(cv:NgbDropdown){
    console.log(cv)
    cv.toggle();
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
            { label: 'Level 3 - Item 2' }
          ]
        }
      ]
    }
  ];
}
