import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  defaultThemeMode = 'system';
  themeMode = this.defaultThemeMode;
  constructor() { }

  initialize() {
    if (document.documentElement.hasAttribute('data-bs-theme-mode')) {
      this.themeMode =
        document.documentElement.getAttribute('data-bs-theme-mode')!;
    } else {
      if (localStorage.getItem('data-bs-theme') !== null) {
        this.themeMode = localStorage.getItem('data-bs-theme') as
          | 'dark'
          | 'light'
          | 'system';
      } else {
        this.themeMode = this.defaultThemeMode;
      }
    }

    if (this.themeMode === 'system') {
      this.themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    document.documentElement.setAttribute('data-bs-theme', this.themeMode);
  }

  setThemeMode(mode: 'dark' | 'light' | 'system') {
    this.themeMode = mode;
    document.documentElement.setAttribute('data-bs-theme', mode);
    localStorage.setItem('data-bs-theme', mode);
  }

  getThemeMode() {
    return this.themeMode;
  }
}
