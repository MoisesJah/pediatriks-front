import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FichasService } from 'src/app/services/fichas/fichas.service';
import { ThemeService } from 'src/app/services/theme.service';
import { SurveyModule } from 'survey-angular-ui';
import { Model } from 'survey-core';
import { DefaultLight, DefaultDark } from "survey-core/themes";

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [SurveyModule],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss'
})
export class SurveyComponent implements OnInit {
  survey!: Model
  route = inject(ActivatedRoute)
  theme = inject(ThemeService)
  fichaId = this.route.snapshot.paramMap.get('id');
  fichaService = inject(FichasService)


  ngOnInit(): void {
    this.getFicha();
  }

  getFicha() {
    this.fichaService.getById(this.fichaId!).subscribe(ficha => {
      this.survey = new Model(ficha.data.body);
      this.survey.applyTheme(this.theme.getThemeMode() === 'dark' ? DefaultDark : DefaultLight);
    })
  }
}
