import { Component, OnInit } from '@angular/core';
import { SurveyModule } from 'survey-angular-ui';
import { Model } from "survey-core";
import { json } from './json';

@Component({
  selector: 'app-surveys',
  standalone: true,
  imports: [SurveyModule],
  templateUrl: './surveys.component.html',
  styleUrl: './surveys.component.scss'
})
export class SurveysComponent implements OnInit {
  title = 'My First Survey';
  surveyModel!: Model;

  ngOnInit(): void {
    const survey = new Model(json);
    this.surveyModel = survey;
    survey.onComplete.add((result) => console.log(result));
  }
}
