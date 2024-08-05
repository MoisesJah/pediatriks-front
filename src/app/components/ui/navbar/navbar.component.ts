import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [DropdownComponent,CommonModule,PopoverComponent],
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  authService = inject(AuthService)
  router = inject(Router)

  user = this.authService.user()

  removeCredentials() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
    this.removeCredentials()
  }
}
