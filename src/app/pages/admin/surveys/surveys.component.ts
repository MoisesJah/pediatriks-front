import { Component, inject, OnInit } from '@angular/core';
import { SurveyModule } from 'survey-angular-ui';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { FichasService } from 'src/app/services/fichas/fichas.service';
import { map, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-surveys',
  standalone: true,
  imports: [SurveyModule, HeaderComponent,CommonModule,RouterLink],
  templateUrl: './surveys.component.html',
  styleUrl: './surveys.component.scss',
})
export class SurveysComponent implements OnInit {
  fichasService = inject(FichasService);
  fichasList = new Observable();

  ngOnInit(): void {
    this.getFichas();
  }

  getFichas() {
    this.fichasList = this.fichasService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }
}
