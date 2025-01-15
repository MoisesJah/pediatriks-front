//@ts-nocheck
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FichaResultService } from 'src/app/services/ficha-result/ficha-result.service';
import { ThemeService } from 'src/app/services/theme.service';
import { SurveyModel as Model } from 'survey-core';
import { DefaultDark, DefaultLight } from 'survey-core/themes';
import { SurveyModule } from 'survey-angular-ui';
import 'survey-core/i18n/spanish';
import { AuthService } from 'src/app/services/auth.service';
import { SurveyPDF } from 'survey-pdf';
import { footer1, logo } from 'src/app/utils/logo';

function createSurveyPdfModel(body: any, survey: Model) {
  const pdfWidth = !!survey && survey.pdfWidth ? survey.pdfWidth : 210;
  const pdfHeight = !!survey && survey.pdfHeight ? survey.pdfHeight : 297;
  const options = {
    fontSize: 14,
    margins: {
      left: 10,
      right: 10,
      top: 10,
      bot: 10,
    },
    format: [pdfWidth, pdfHeight],
  };

  const surveyPDF = new SurveyPDF(body, options);
  if (survey) {
    surveyPDF.data = survey.data;
    surveyPDF.locale = survey.locale;
  }
  surveyPDF.onRenderHeader.add(async (_, canvas) => {
    await canvas.drawImage({
      base64: logo,
      width: 100,
      
      // horizontalAlign: 'left',
      // width: (canvas.rect.yBot - canvas.rect.yTop) * 3,
      // height: (canvas.rect.yBot - canvas.rect.yTop) * 1.5,
      // margins: { left: (canvas.rect.yBot - canvas.rect.yTop) * 0.2 },
    });
  });

  surveyPDF.onRenderFooter.add(async (_, canvas) => {
    canvas.drawText({
      text: '632-8556',
      fontSize: 10,
    });
    await canvas.drawImage({
      base64:footer1,
      height: 520,
      width: 210,

      rect: {
        // xLeft: 0,

        // yTop: 0,
        // xRight: canvas.rect.xRight,
        // yBot: canvas.rect.yBot
      }      
    })
    canvas.drawText({
      text: 'Pagina ' + canvas.pageNumber + ' de ' + canvas.pageCount,
      fontSize: 10,
      horizontalAlign: 'right',
      verticalAlign: 'bottom',
      margins: {
        right: 12,
      },
    });
  });

  return surveyPDF;
}

@Component({
  selector: 'app-fichas-result',
  standalone: true,
  imports: [SurveyModule],
  templateUrl: './fichas-result.component.html',
  styleUrl: './fichas-result.component.scss',
})
export class FichasResultComponent implements OnInit {
  fichaResultService = inject(FichaResultService);
  activeRoute = inject(ActivatedRoute);
  authService = inject(AuthService);
  resultId = this.activeRoute.snapshot.paramMap.get('resultId');
  survey!: Model;
  theme = inject(ThemeService);

  ngOnInit(): void {
    this.getResult();
    console.log(this.resultId);
  }

  getResult() {
    this.fichaResultService.getOne(this.resultId!).subscribe((res) => {
      const data = JSON.parse(res.data.ficha.body);
      data.mode = !this.authService.isTerapista() ? 'display' : undefined;

      this.survey = new Model(JSON.stringify(data));
      this.survey.locale = 'es';
      this.survey.applyTheme(
        this.theme.getThemeMode() === 'dark' ? DefaultDark : DefaultLight
      );
      this.survey.addNavigationItem({
        id: 'pdf',
        title: 'Guardar como PDF',
        action: (c) => this.savePdf(res.data.ficha.body),
      });

      this.survey.mergeData(res.data.body);
      this.survey.data = JSON.parse(res.data.body);
      this.survey.completedHtml = '<h3>Ficha Actualizada!</h3>';

      this.survey.onComplete.add((model, options) => {
        options.showSaveInProgress();

        this.fichaResultService
          .update(this.resultId!, { body: JSON.stringify(model.data) })
          .subscribe({
            next: () => {
              options.showSaveSuccess('Ficha Actualizada!');
            },
            error: () => {
              options.showSaveError();
            },
          });
      });
    });
  }
  savePdf(body:any) {
    console.log(body);
    createSurveyPdfModel(body, this.survey).save('ficha.pdf');
  }
}
