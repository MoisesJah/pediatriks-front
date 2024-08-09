import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [DropdownComponent, CommonModule, PopoverComponent,RouterLink],
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);

  user = this.authService.user();

  removeCredentials() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.removeCredentials();
  }
}
