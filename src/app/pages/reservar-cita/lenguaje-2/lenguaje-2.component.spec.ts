import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lenguaje2Component } from './lenguaje-2.component';

describe('Lenguaje2Component', () => {
  let component: Lenguaje2Component;
  let fixture: ComponentFixture<Lenguaje2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Lenguaje2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lenguaje2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
