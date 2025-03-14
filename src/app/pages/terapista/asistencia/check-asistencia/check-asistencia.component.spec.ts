import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAsistenciaComponent } from './check-asistencia.component';

describe('CheckAsistenciaComponent', () => {
  let component: CheckAsistenciaComponent;
  let fixture: ComponentFixture<CheckAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckAsistenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
