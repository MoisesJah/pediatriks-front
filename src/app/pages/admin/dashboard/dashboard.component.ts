import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class AdminDashboardComponent {
}
