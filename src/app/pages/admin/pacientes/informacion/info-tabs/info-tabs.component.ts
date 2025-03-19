import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TabTerapiasComponent } from './tab-terapias/tab-terapias.component';

@Component({
  selector: 'app-info-tabs',
  standalone: true,
  imports: [NgbNavModule,TabTerapiasComponent],
  templateUrl: './info-tabs.component.html',
  styleUrl: './info-tabs.component.scss'
})
export class InfoTabsComponent {

}
