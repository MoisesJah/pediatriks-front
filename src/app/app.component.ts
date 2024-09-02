import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Pediatriks2';

  auth = inject(AuthService);
  theme = inject(ThemeService);

  ngOnInit(): void {
    this.theme.initialize();
  }
} 
