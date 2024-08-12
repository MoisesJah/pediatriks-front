import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Select2Module,Select2Data } from 'ng-select2-component';

@Component({
  selector: 'app-genero-select',
  standalone: true,
  imports: [Select2Module],
  templateUrl: './genero-select.component.html',
  styleUrl: './genero-select.component.scss'
})
export class GeneroSelectComponent {
  data: Select2Data;

  @Output() onSelect = new EventEmitter<any>();

  constructor() { 
    this.data = [
      {
        label: 'Masculino',
        value: 'Masculino'
      },
      {
        label: 'Femenino',
        value: 'Femenino'
      }
    ]
  }
}
