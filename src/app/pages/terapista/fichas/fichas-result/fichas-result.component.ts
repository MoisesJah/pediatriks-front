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
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { vfs } from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

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
      base64: footer1,
      height: 520,
      width: 210,

      rect: {
        // xLeft: 0,
        // yTop: 0,
        // xRight: canvas.rect.xRight,
        // yBot: canvas.rect.yBot
      },
    });
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
        action: () => this.generatePDF(),
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

  generatePDF() {
    const surveyData = this.survey.data;

    const docDefinition: TDocumentDefinitions = {
      header: [
        {
          columns: [
            {
              image: logo,
              width: 180,
              height: 25,
              margin: [10, 10, 10, 10],
            },
            {
              text: '',
              width: '*', // takes up the remaining space
              fillAvailableSpace: true,
            },
            {
              text: this.survey.title,
              fontSize: 11,
              alignment: 'right',
              width: 180, // sets the maximum width to 100px equivalent
              margin: [10, 10, 10, 0],
            },
          ],
          columnGap: 10,
          width: '100%',
        },
        
      ],
      footer: function (currentPage, pageCount) {
        return {
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  fillColor: '#1e88e5',
                  columns: [
                    {
                      width: '70%',
                      stack: [
                        { text: '(01) 632-8556', color: 'white', fontSize: 9 },
                        {
                          text: 'info.pediatriks@gmail.com',
                          color: 'white',
                          fontSize: 9,
                        },
                        {
                          text: 'Av. Universitaria 6604 - Comas',
                          color: 'white',
                          fontSize: 9,
                        },
                      ],
                      margin: [10, 10, 0, 0], // left, top, right, bottom
                    },
                    {
                      width: '30%',
                      text: `Página ${currentPage} de ${pageCount}`,
                      color: 'white',
                      fontSize: 12,
                      alignment: 'right',
                      margin: [0, 18, 10, 0], // Centered vertically with the left text
                    },
                  ],
                },
              ],
            ],
          },
        };
      },
      pageMargins: [40, 80, 40, 47],
      content: [
        {
          text: this.survey.pages[0].title,
          style: 'header',
          fontSize: 18,
        },
        {
          text: this.survey.description,
          style: 'subheader',
        },
        // ...this.generatePDFContent(surveyData)
      ],
      styles: {
        header: {
          fontSize: 20,
          alignment: 'center',
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 20],
        },
        questionTitle: {
          fontSize: 12,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        answer: {
          fontSize: 11,
          margin: [0, 0, 0, 10],
        },
      },
    };

    // itera sobre las preguntas y sus respuestas y las agrega al docDefinition
    // diferentes tipos de pregunta checkbox, radiogroup, matrix
    this.survey.getAllQuestions().forEach((question) => {
      docDefinition.content.push({
        text: question.title,
        style: 'question',
      });

      switch (question.getType()) {
        case 'text':
          docDefinition.content.push({
            text: this.survey.data[question.name],
            style: 'answer',
          });
          break;
        case 'checkbox':
          const checkboxAnswers = this.survey.data[question.name];
          checkboxAnswers.forEach((answer) => {
            docDefinition.content.push({
              text: answer,
              style: 'answer',
            });
          });
          break;
        case 'radiogroup':
          docDefinition.content.push({
            text: this.survey.data[question.name],
            style: 'answer',
          });
          break;
        case 'matrix':
          if (this.survey.data[question.name]) {
            const table = {
              table: {
                headerRows: 1,
                widths: ['*', ...Array(question.columns.length).fill('*')],
                body: [
                  [''].concat(question.columns.map((column) => column.text)),
                ],
              },
            };
            question.rows.forEach((row) => {
              const rowData = [row.text];
              question.columns.forEach((column) => {
                rowData.push(
                  this.survey.data[question.name][row.value] === column.value
                    ? '•'
                    : ''
                );
              });
              table.table.body.push(rowData);
            });
            docDefinition.content.push(table);
          }
          break;
        default:
          console.log(`Unsupported question type: ${question.type}`);
      }
    });
    const newPdfMake = Object.assign({}, pdfMake);
    newPdfMake.vfs = pdfFonts;
    newPdfMake.createPdf(docDefinition).download('survey-responses.pdf');
  }
  generatePDFContent(data: any) {
    const content: any[] = [];

    Object.entries(data).forEach(([key, value]) => {
      const question = this.survey.getQuestionByName(key);
      if (question) {
        content.push({ text: question.title, style: 'questionTitle' });

        if (Array.isArray(value)) {
          content.push({
            text: value.join(', '),
            style: 'answer',
          });
        } else if (typeof value === 'object') {
          Object.entries(value).forEach(([rowKey, rowValue]) => {
            content.push({
              text: `${rowKey}: ${rowValue}`,
              style: 'answer',
            });
          });
        } else {
          content.push({
            text: value.toString(),
            style: 'answer',
          });
        }
      }
    });

    return content;
  }
}
