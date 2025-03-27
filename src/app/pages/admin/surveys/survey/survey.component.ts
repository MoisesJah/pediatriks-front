import { AfterViewInit, Component, inject, model, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FichaResultService } from 'src/app/services/ficha-result/ficha-result.service';
import { FichasService } from 'src/app/services/fichas/fichas.service';
import { ThemeService } from 'src/app/services/theme.service';
import { SurveyModule } from 'survey-angular-ui';
import { Model } from 'survey-core';
import { DefaultLight, DefaultDark } from 'survey-core/themes';
import 'survey-core/i18n/spanish';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CitaService } from 'src/app/services/citas/cita.service';

@UntilDestroy()
@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [SurveyModule, RouterLink],
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
  citaService = inject(CitaService);
  fichaResult = inject(FichaResultService);

  showCloseMg: boolean = false;

  fichaResultExists = null

  ngOnInit(): void {
    if(!this.fichaResultExists){
      this.getFicha()
    }
    this.getFichaExists()
  }

  mergePaciente(survey: Model) {
    this.citaService.getPacienteInfo(this.sesionId!).subscribe((paciente) => {
      survey.mergeData({
        nombres: paciente.data.nombres,
        diagnostico: paciente.data.diagnostico,
        apoderado: paciente.data.apoderado,
        fecha_nacimiento: paciente.data.fecha_nacimiento,
        edad: paciente.data.edad,
        personal: paciente.data.personal,
        telefono: paciente.data.telefono,
        colegio: paciente.data.colegio,
      });
    });
  }

  getFichaExists(){
    this.fichaResult.exists(this.sesionId!, this.fichaId!).subscribe((resp) => {
      this.fichaResultExists = resp.data
    })
  }

  getFicha() {
    this.fichaService.getById(this.fichaId!).subscribe((ficha) => {
      this.survey = new Model(ficha.data.body);
      this.survey.locale = 'es';
      this.survey.applyTheme(
        this.theme.getThemeMode() === 'dark' ? DefaultDark : DefaultLight
      );
      let message = `<h3>Ficha Completada!</h3>`;
      this.survey.completedHtml = message

      if(this.showCloseMg) message += '<a href="javascript:window.close();">Ya puede cerrar esta ventana</a>';

      this.mergePaciente(this.survey);

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
              this.showCloseMg = true;
              console.log(this.showCloseMg)
              options.showSaveSuccess('Ficha Guardada Correctamente!');
            },
            error: () => {
              this.showCloseMg = false;
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
