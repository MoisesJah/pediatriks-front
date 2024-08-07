import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from 'src/app/components/ui/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent,RouterOutlet],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


}
