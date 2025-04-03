import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { ThemeService } from 'src/app/services/theme.service';

@UntilDestroy()
@Component({
  selector: 'app-info-mensual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-mensual.component.html',
})
export class InfoMensualComponent implements OnInit {
  personalService = inject(PersonalService);
  router = inject(ActivatedRoute);
  isLoading = inject(LoadingService).isLoading;
  atencionesList = new Observable();
  theme = inject(ThemeService);

  id_personal = this.router.snapshot.params['id'];

  listStats = new Observable();

  ngOnInit(): void {
    this.getRecords()
  }

  getRecords() {
    this.listStats = this.personalService
      .getStatMensual({ id_personal: this.id_personal })
      .pipe(
        map((resp) => resp.data.mensual),
        untilDestroyed(this)
      );
  }
}
