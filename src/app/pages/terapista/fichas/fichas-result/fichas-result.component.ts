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
import { style } from '@angular/animations';
import { EventManagerPlugin } from '@angular/platform-browser';

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

  personalId = this.authService.user()?.personal?.id_personal;

  ngOnInit(): void {
    this.getResult();
  }

  getResult() {
    this.fichaResultService.getOne(this.resultId!).subscribe((res) => {
      const data = JSON.parse(res.data.ficha.body);
      const isFichaPersonal =
        res.data.sesion.personal.id_personal === this.personalId;

      data.mode =
        !this.authService.isTerapista() || !isFichaPersonal
          ? 'display'
          : undefined;

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

    const customPanels = new Set<string>([
      'd_spino',
      'a_oro',
      'd_prono',
      'sedente',
      'pie_postura',
      'anamnesis',
      'f_estg',
      'e_nleng',
      'c_sensorial',
      'c_motor',
      'c_ctivo',
      'percep',
      'p_com',
      'p_vidad',
      'p_juego',
      'p_juegopsico',
      'p_rgpc',
      'p_em',
      'p_escol',
      'p_trans',
      'panel_silabas2',
      'panel_silabas1',
      'p_cond',
      'articulacion_table',
    ]);
    const allPanels = this.survey.getAllPanels().map((panel) => panel.name);

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
              width: 250, // sets the maximum width to 100px equivalent
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
      pageMargins: [40, 90, 40, 47],
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
                    w: 550, // Width for 70%
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
          margin: [0, 10, 0, 5],
        },
        answer: {
          fontSize: 11,
          // margin: [0, 0, 0, 10],
        },
      },
    };

    const data = [];

    docDefinition.content.splice(2, 0, {
      columns: [
        {
          table: {
            widths: [175, '*'],
            body: data,
            layout: {
              defaultBorder: false,
            },
          },
          margin: [0, 5, 0, 20], // top, right, bottom, left
        },
      ],
    });

    this.survey.getAllQuestions().forEach((question) => {
      // console.log(question.title, this.survey.title);
      if (question.parent && customPanels.has(question.parent.name)) return;
      const firstPanel = this.survey
        .getAllPanels()[0]
        .elements.includes(question);
      const value = question.value ? question.value : '';

      if (firstPanel && question.visible) {
        data.push([
          { text: `${question.title}:`, border: [false] },
          { text: `${value}`, border: [false, false, false, true] },
        ]);
        return;
      }

      const shouldShowTitle =
        question.titleLocation !== 'hidden' &&
        question.getType() !== 'html' &&
        question.visible;
      const isTitleLeft = question.getTitleLocation() === 'left';

      // Add title (if needed) before question content
      if (shouldShowTitle && !isTitleLeft) {
        docDefinition.content.push({
          text: question.title,
          style: 'questionTitle',
        });
      }

      switch (question.getType()) {
        case 'text':
          const answer = this.survey.data[question.name];
          if (
            !firstPanel &&
            this.survey.title !== 'CUADERNILLO PRO ESC PSICOLOGIA'
          ) {
            if (isTitleLeft) {
              docDefinition.content.push({
                columns: [
                  {
                    text: `${question.title}:`,
                    bold: true,
                    fillColor: '#f1f1f1',
                    margin: [10, 20, 50, 10],
                  },
                  { text: answer, margin: [10, 20, 10, 10], fillColor: 'blue' },
                ],
              });
            } else {
              docDefinition.content.push({
                text: answer || '\n',
                style: 'answer',
              });
            }
          }
          break;
        case 'checkbox':
          if (
            this.survey.data[question.name] &&
            question.choices &&
            Array.isArray(question.choices)
          ) {
            const checkboxValues = this.survey.data[question.name];
            const options = question.choices;

            options.forEach((option, index) => {
              const row = [];
              if (checkboxValues.includes(option.value)) {
                row.push('[X]'); // Checked mark  character
              } else {
                row.push('[ ]'); // Unchecked mark  character
              }
              row.push(option.text);

              docDefinition.content.push({
                text: row.join(' '),
                margin: [20, 10, 0, 0],
                fontSize: 12,
              });
            });
            if (checkboxValues.includes('other')) {
              const otherValue = question.commentElements[0].value;
              docDefinition.content.push({
                text: '[X] Otro: ' + otherValue,
                margin: [20, 10, 0, 0],
              });
            }
          }
          break;
        case 'radiogroup':
          docDefinition.content.push({
            text: this.survey.data[question.name],
            style: 'answer',
          });
          break;
        case 'boolean':
          const value = this.survey.data[question.name];
          docDefinition.content.push({
            text: [
              value ? '[X] Si' : '[ ] Si',
              value ? '[ ] No' : '[X] No',
            ].join('          '),
            margin: [20, 10, 0, 0],
            fontSize: 12,
          });
          break;
        case 'matrix':
          this.handleMatrix(this.survey, docDefinition, question);
          break;
        case 'comment':
          if (!firstPanel) {
            if (this.survey.getValue(question.name)) {
              docDefinition.content.push({
                text: this.survey.data[question.name],
                style: 'answer',
              });
            } else {
              docDefinition.content.push({
                text: 'Sin Respuesta',
                style: 'answer',
              });
            }
          }
          break;
        case 'matrixdynamic':
          if (this.survey.data[question.name]) {
            const maxColumns = Math.max(
              ...this.survey.data[question.name].map(
                (row) => Object.values(row).length
              )
            );
            const tableRows = this.survey.data[question.name].map((row) => {
              const values = Object.values(row);
              return [...values, ...Array(maxColumns - values.length).fill('')];
            });

            const table = {
              table: {
                widths: ['auto', ...Array(maxColumns - 1).fill('auto')],
                body: tableRows,
                dontBreakRows: true,
                layout: {
                  keepWithHeader: true,
                },
              },
            };

            if (
              !docDefinition.content.find(
                (item) => item.text === question.title
              ) && question.titleLocation !== 'hidden'
            ) {
              docDefinition.content.push({
                text: question.title,
                style: 'questionTitle',
                margin: [0, 100, 0, 5],
              });
            }

            docDefinition.content.push(table);

            // Add a spacer element
            docDefinition.content.push({
              text: '',
              margin: [0, 20, 0, 0],
            });
          }
          break;
        default:
          console.log(`Unsupported question type: ${question.getType()}`);
      }
    });
    this.rendrCustomQuestions(this.survey, docDefinition);
    console.log(docDefinition);

    const newPdfMake = Object.assign({}, pdfMake);
    newPdfMake.vfs = pdfFonts;
    newPdfMake.createPdf(docDefinition).download('survey-responses.pdf');
  }

  handleMatrix(
    survey: Model,
    docDefinition: TDocumentDefinitions,
    question: any
  ) {
    if (this.survey.data[question.name]) {
      const tableHeaders = [''].concat(
        question.columns.map((column) => column.text)
      );

      const tableRows = question.rows.map((row) => {
        const rowData = [{ text: row.text, wordWrap: true }];
        question.columns.forEach((column) => {
          rowData.push({
            text:
              this.survey.data[question.name][row.value] === column.value
                ? 'X'
                : '',
            wordWrap: true,
            minHeight: 20,
          });
        });
        return rowData;
      });

      const table = {
        table: {
          headerRows: 1,
          widths: ['auto', ...Array(question.columns.length).fill('auto')],
          body: [tableHeaders, ...tableRows],
          dontBreakRows: true,
          layout: {
            keepWithHeader: true,
          },
        },
      };

      if (!docDefinition.content.find((item) => item.text === question.title) && question.titleLocation !== 'hidden') {
        docDefinition.content.push({
          text: question.title,
          style: 'questionTitle',
          margin: [0, 1, 0, 5],
        });
      }

      docDefinition.content.push(table);
      // Add a spacer element
    }
  }

  rendrCustomQuestions(survey: Model, docDefinition: TDocumentDefinitions) {
    this.customTableSilabas(survey, docDefinition);
    this.tableEscalaMotor(survey, docDefinition);
    this.fichaEvaluacion(survey, docDefinition);
    this.fichaOcupacional(survey, docDefinition);
    this.fichaEPsico(survey, docDefinition);
  }

  customTableSilabas(survey: Model, docDefinition: TDocumentDefinitions) {
    const panelNames = ['panel_silabas1', 'panel_silabas2'];
    const tables1 = [];
    const tables2 = [];

    panelNames.forEach((panelName) => {
      const panel = survey.getAllPanels().find((p) => p.name === panelName);

      if (panel) {
        const panels = panel.elements;

        panels.forEach((panelElement) => {
          const headers = [];
          const data = [];

          headers.push([
            {
              text: panelElement.title,
              alignment: 'center',
              colSpan: panels.length,
            },
            '',
            '',
          ]);

          panelElement.elements.forEach((question) => {
            data.push([
              {
                text: question.title,
              },
              {
                text: survey.data[question.name] || '',
                colSpan: 2,
              },
            ]);
          });

          const table = {
            table: {
              body: [...headers, ...data],
            },
          };

          if (panelName === 'panel_silabas1') {
            tables1.push(table);
          } else {
            tables2.push(table);
          }
        });
      }
    });


    if(panelNames.every(p => survey.getAllPanels().some(pa => pa.name === p))) {
      docDefinition.content.splice(5, 0, {
        columns: [
          {
            width: '*',
            columns: tables1,
          },
        ],
        margin: [0, 20, 0, 0],
      });

      docDefinition.content.splice(6, 0, {
        columns: [
          {
            width: '*',
            columns: tables2,
          },
        ],
        margin: [0, 20, 0, 20],
      });
    }
  }

  tableEscalaMotor(survey: Model, docDefinition: TDocumentDefinitions) {
    const mainPanel = survey
      .getAllPanels()
      .find((panel) => panel.name === 'escala_motora');

    if (mainPanel) {
      const content = [];

      content.push({
        text: mainPanel.title.toUpperCase(),
        bold: true,
        margin: [0, 20, 0, 10],
      });

      const panels = mainPanel.elements;

      panels.forEach((panel) => {
        content.push({
          text: panel.title.toUpperCase(),
          bold: true,
          margin: [0, 20, 0, 5],
        });

        panel.elements.forEach((question) => {
          content.push({
            columns: [
              { text: question.title, bold: true, width: '20%' }, // e.g., "P:"
              { text: survey.data[question.name] || '-', width: '80%' }, // Answer or placeholder
            ],
            margin: [0, 0, 0, 5],
          });
        });
      });

      const targetQuestionIndex = docDefinition.content.findIndex(
        (item) =>
          item.text ===
          'IMPRESIÓN GENERAL (comportamiento social, visión, audición, lenguaje, etc.)'
      );

      if (targetQuestionIndex !== -1) {
        console.log(targetQuestionIndex);
        docDefinition.content.splice(targetQuestionIndex + 2, 0, ...content);
      }
    }
  }

  fichaEvaluacion(survey: Model, docDefinition: TDocumentDefinitions) {
    const title = survey.title === 'FICHA DE EVALUACION DE TERAPIA DE LENGUAJE';

    const panel1 = survey
      .getAllPanels()
      .find((panel) => panel.name === 'anamnesis');
    const panel2 = survey
      .getAllPanels()
      .find((panel) => panel.name === 'a_oro');
    const panel3 = survey
      .getAllPanels()
      .find((panel) => panel.name === 'f_estg');
    const panel4 = survey
      .getAllPanels()
      .find((panel) => panel.name === 'e_nleng');
    const panel5 = survey
      .getAllPanels()
      .find((panel) => panel.name === 'articulacion_table');

    const content = [];

    if (title) {
      content.push({
        text: panel1.title.toUpperCase(),
        bold: true,
        margin: [0, 20, 0, 10],
      });
      panel1.elements.forEach((question) => {
        content.push({
          columns: [
            { text: question.title, bold: true, width: '40%' }, // e.g., "P:"
            { text: survey.data[question.name] || '-', width: '60%' }, // Answer or placeholder
          ],
          margin: [0, 5, 0, 5],
        });
      });

      content.push({
        text: panel2.title.toUpperCase(),
        bold: true,
        margin: [0, 20, 0, 10],
      });

      panel2?.elements.forEach((question) => {
        const options = question.choices;

        content.push({
          text: question.title.toUpperCase(),
          bold: true,
          margin: [0, 20, 0, 5],
        });

        options.forEach((option, index) => {
          const row = [];
          if (survey.data[question.name].includes(option.value)) {
            row.push('[X]'); // Checked mark  character
          } else {
            row.push('[ ]'); // Unchecked mark  character
          }
          row.push(option.text);

          content.push({
            text: row.join(' '),
            margin: [20, 10, 0, 0],
            fontSize: 12,
          });
        });
      });

      content.push({
        text: panel3.title.toUpperCase(),
        bold: true,
        margin: [0, 20, 0, 10],
      });

      content.push({
        columns: [
          {
            width: '50%',
            stack: panel3.elements.slice(0, 3).map((q) => [
              { text: q.title, bold: true, margin: [15, 0, 0, 0] },
              { text: survey.data[q.name] || '', margin: [15, 15, 0, 15] },
            ]),
          },
          {
            width: '50%',
            stack: panel3.elements.slice(3).map((q) => [
              { text: q.title, bold: true },
              { text: survey.data[q.name] || '', margin: [0, 15] },
            ]),
          },
        ],
      });

      const targetIndex = survey
        .getAllQuestions()
        .findIndex((q) => q.title === 'MOTIVO DE CONSULTA:');

      content.push({
        text: panel4.title.toUpperCase(),
        bold: true,
        margin: [0, 20, 0, 10],
      });

      panel4.elements.forEach((question) => {
        content.push({
          text: question.title,
          bold: true,
          margin: [15, 0, 0, 0],
        });

        content.push({
          text: survey.data[question.name],
          margin: [15, 10, 0, 20],
        });
      });

      content.push({
        text: panel5.title.toUpperCase(),
        bold: true,
        margin: [0, 20, 0, 10],
      });

      const columns = [[], []];

      panel5.elements.forEach((question, index) => {
        const column = columns[index % 2];
        const options = question.choices;

        column.push({
          text: question.title.toUpperCase(),
          bold: true,
          margin: [0, 20, 0, 5],
        });

        if (options) {
          options.forEach((option) => {
            const row = [
              survey.data[question.name]?.includes(option.value)
                ? '[X]'
                : '[ ]',
              option.text,
            ];

            column.push({
              text: row.join(' '),
              margin: [20, 10, 0, 0],
              fontSize: 12,
            });
          });
        }
      });

      content.push({
        columns: [
          { width: '50%', stack: columns[0] },
          { width: '50%', stack: columns[1] },
        ],
      });

      if (targetIndex !== -1) {
        docDefinition.content.splice(4 + 1, 0, ...content);
      }
    }
  }

  fichaEPsico(survey: Model, docDefinition: TDocumentDefinitions) {
    const panels = ['p_juegopsico', 'p_rgpc', 'p_em'].map((name) =>
      survey.getAllPanels().find((panel) => panel.name === name)
    );

    const content = panels.reduce((acc, panel) => {
      if (!panel) return acc;

      acc.push({
        text: panel.title.toUpperCase(),
        bold: true,
        margin: [0, 20, 0, 10],
      });

      panel.elements.forEach((question) => {
        acc.push({
          text: question.title,
          bold: true,
          margin: [20, 20, 0, 5],
        });

        acc.push({
          text: survey.data[question.name],
          margin: [20, 10, 0, 0],
          fontSize: 12,
        });
      });
      return acc;
    }, []);

    console.log(docDefinition.content);

    docDefinition.content.splice(11, 0, ...content);
  }

  fichaOcupacional(survey: Model, docDefinition: TDocumentDefinitions) {
    const panels = [
      'c_sensorial',
      'c_motor',
      'c_ctivo',
      'percep',
      'p_com',
      'p_vidad',
      'p_juego',
      'p_cond',
      'p_escol',
      'p_trans',
    ].map((name) => survey.getAllPanels().find((panel) => panel.name === name));

    const p_matrix = survey.getAllPanels().find((p) => p.name === 'p_matrix');

    const content = panels.reduce((acc, panel) => {
      if (!panel) return acc;

      acc.push({
        text: panel.title.toUpperCase(),
        bold: true,
        margin: [0, 20, 0, 10],
      });

      panel.elements.forEach((question) => {
        const isExpression = question.getType() === 'expression';
        const isCheckbox = question.getType() === 'checkbox';

        const checkquestion =
          (isCheckbox || isExpression) && !question.name.startsWith('q-');
        acc.push({
          text: checkquestion
            ? `• ${question.title.toUpperCase()}`
            : question.title,
          bold: true,
          margin: [
            (!isExpression && !isCheckbox) || question.name.startsWith('q-')
              ? 20
              : 0,
            20,
            0,
            isExpression ? -10 : 5,
          ],
        });

        const options = question.choices;
        if (options) {
          options.forEach((option) => {
            acc.push({
              text: `${
                survey.data[question.name]?.includes(option.value)
                  ? '[X]'
                  : '[ ]'
              } ${option.text}`,
              margin: [20, 10, 0, 0],
              fontSize: 12,
            });
          });
        } else {
          acc.push({
            text:
              question.getType() !== 'expression'
                ? survey.data[question.name]
                : '\n',
            margin: [20, 10, 0, 0],
            fontSize: 12,
          });
        }
      });

      return acc;
    }, []);

    docDefinition.content.splice(26, 0, ...content);
  }
}
