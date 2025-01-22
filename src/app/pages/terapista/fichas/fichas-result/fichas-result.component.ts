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
              options.showSaveSuccess('Ficha Actualizada Correctamente!');
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
              width: 190,
              height: 41,
              margin: [20, 10, 10, 10],
            },
            {
              text: '',
              width: '*', // takes up the remaining space
              fillAvailableSpace: true,
            },
            {
              text: this.survey.title,
              fontSize: 11,
              bold: true,
              color: '#fbb506',
              alignment: 'right',
              width: 180, // sets the maximum width to 100px equivalent
              margin: [20, 20, 20, 0],
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
                  fillColor: '#15c4c5',
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
                      margin: [40, 10, 0, 0], // left, top, right, bottom
                    },
                    {
                      width: '30%',
                      text: `Página ${currentPage} de ${pageCount}`,
                      color: 'white',
                      fontSize: 11,
                      alignment: 'right',
                      margin: [0, 18, 40, 0], // Centered vertically with the left text
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
          text: this.survey.pages[0].description,
          style: 'subheader',
        },
        // ...this.generatePDFContent(surveyData)
      ],
      background: function () {
        return [
          // Light blue line (70%)
          {
            columns: [
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 25,
                    y: 50, // Adjust this value to position the line below your header
                    w: 500, // Width for 70%
                    h: 4, // Height of the line
                    color: '#15c4c5',
                  },
                ],
              },
              // Purple line (30%)
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 400, // Starts where the blue line ends
                    y: 90, // Same y position as blue line
                    w: 160, // Width for remaining 30%
                    h: 4, // Same height
                    color: '#800080',
                  },
                ],
              },
            ],
          },
        ];
      },
      styles: {
        header: {
          fontSize: 20,
          alignment: 'center',
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          // bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        questionTitle: {
          fontSize: 12,
          bold: true,
          // margin: [0, 10, 0, 5],
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
        style: 'questionTitle',
      });

      console.log(question.parent);

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
    const tableHeaders = [''].concat(
      question.columns.map((column) => column.text)
    );

    const tableRows = question.rows.map((row) => {
      const rowData = [{ text: row.text, wordWrap: true }];
      question.columns.forEach((column) => {
        rowData.push({
          text: this.survey.data[question.name][row.value] === column.value ? '•' : '',
          wordWrap: true,
          minHeight: 20,
        });
      });
      return rowData;
    });

    const table = {
      table: {
        headerRows: 1,
        widths: [
          'auto',
          ...Array(question.columns.length).fill('auto'),
        ],
        body: [tableHeaders, ...tableRows],
        layout: {
          dontBreakRows: true,
          keepWithHeader: true,
        },
      },
    };

    if (!docDefinition.content.find(item => item.text === question.title)) {
      docDefinition.content.push({
        text: question.title,
        style: 'questionTitle',
        margin: [0, 0, 0, 5],
      });
    }

    docDefinition.content.push(table);

    // Add a spacer element
    docDefinition.content.push({
      text: '',
      margin: [0, 10, 0, 0],
    });
  }
  break;
        default:
          console.log(`Unsupported question type: ${question.getType()}`);
      }
    });
    const newPdfMake = Object.assign({}, pdfMake);
    newPdfMake.vfs = pdfFonts;
    newPdfMake.createPdf(docDefinition).download('survey-responses.pdf');
  }
}
