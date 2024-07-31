import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarHorarioComponent } from './modificar-horario.component';

describe('ModificarHorarioComponent', () => {
  let component: ModificarHorarioComponent;
  let fixture: ComponentFixture<ModificarHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarHorarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
