import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from '../popover/popover.component';
import { ThemeService } from 'src/app/services/theme.service';

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
  theme = inject(ThemeService);

  user = this.authService.user();

  removeCredentials() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  setDarkTheme() {
    this.theme.setThemeMode('dark')
  }

  setLightTheme() {
    this.theme.setThemeMode('light')  
  }

  setSystemTheme() {
    this.theme.setThemeMode('system')
  }

  logout() {
    this.authService.logout();
    this.removeCredentials();
    this.router.navigate(['/login']);
  }
}
