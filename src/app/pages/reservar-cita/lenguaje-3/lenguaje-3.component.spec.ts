import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lenguaje3Component } from './lenguaje-3.component';

describe('Lenguaje3Component', () => {
  let component: Lenguaje3Component;
  let fixture: ComponentFixture<Lenguaje3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Lenguaje3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lenguaje3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
