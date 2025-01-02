import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-fichas',
  standalone:true,
  templateUrl: './fichas.component.html',
  styleUrl: './fichas.component.scss'
})
export class FichasComponent implements OnInit {
  authService = inject(AuthService)

  ngOnInit(): void {
      
  }
}
