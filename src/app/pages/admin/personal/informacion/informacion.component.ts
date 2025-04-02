import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Personal } from 'src/app/models/personal';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { HeaderComponent } from "../../../../components/ui/header/header.component";
import { InfoTabsComponent } from "./info-tabs/info-tabs.component";

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [HeaderComponent, InfoTabsComponent],
  templateUrl: './informacion.component.html',
})
export class InformacionComponent implements OnInit {
  router = inject(ActivatedRoute);
  pacienteService = inject(PersonalService);

  id_personal = this.router.snapshot.paramMap.get('id');

  currentPersonal: Personal | null = null;

  ngOnInit(): void {
    this.getPersonal();
  }

  getPersonal() {
    return this.pacienteService.getById(this.id_personal!).subscribe((resp) => {
      this.currentPersonal = resp.data;
    });
  }
}
