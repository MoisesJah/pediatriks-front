import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { PersonalService } from '../services/personal/personal.service';

export const testerResolver: ResolveFn<any> = (route, state) => {
  const service = inject(PersonalService)
  return service.getHorarios(route.paramMap.get('terapist')!).pipe(
    map((resp) => resp.data)
  )
};
