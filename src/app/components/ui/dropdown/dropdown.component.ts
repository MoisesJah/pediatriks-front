import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  imports: [NgbDropdownModule, CommonModule],
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {}
