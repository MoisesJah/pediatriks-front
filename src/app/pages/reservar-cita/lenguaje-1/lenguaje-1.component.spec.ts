import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lenguaje1Component } from './lenguaje-1.component';

describe('Lenguaje1Component', () => {
  let component: Lenguaje1Component;
  let fixture: ComponentFixture<Lenguaje1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Lenguaje1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lenguaje1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
