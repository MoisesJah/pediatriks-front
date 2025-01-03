import { AfterViewInit, Component, inject, model, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FichaResultService } from 'src/app/services/ficha-result/ficha-result.service';
import { FichasService } from 'src/app/services/fichas/fichas.service';
import { ThemeService } from 'src/app/services/theme.service';
import { SurveyModule } from 'survey-angular-ui';
import { Model } from 'survey-core';
import { DefaultLight, DefaultDark } from 'survey-core/themes';
import "survey-core/i18n/spanish";

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [SurveyModule],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss',
})
export class SurveyComponent implements OnInit, AfterViewInit {
  survey!: Model;
  route = inject(ActivatedRoute);
  theme = inject(ThemeService);
  fichaId = this.route.snapshot.paramMap.get('surveyId');
  sesionId = this.route.snapshot.paramMap.get('sesionId');
  fichaService = inject(FichasService);
  fichaResult = inject(FichaResultService);

  ngOnInit(): void {
    this.getFicha();
  }

  getFicha() {
    this.fichaService.getById(this.fichaId!).subscribe((ficha) => {
      this.survey = new Model(ficha.data.body);
      this.survey.locale = 'es';
      this.survey.applyTheme(
        this.theme.getThemeMode() === 'dark' ? DefaultDark : DefaultLight
      );

      this.survey.onComplete.add((model, options) => {
        options.showSaveInProgress();

        this.fichaResult
          .create({
            id_sesion: this.sesionId,
            id_ficha: this.fichaId,
            body: JSON.stringify(model.data),
          })
          .subscribe({
            next: () => {
              options.showSaveSuccess();
            },
            error: () => {
              options.showSaveError();
            },
          });
      });
    });
  }

  ngAfterViewInit(): void {
    //
  }
}
