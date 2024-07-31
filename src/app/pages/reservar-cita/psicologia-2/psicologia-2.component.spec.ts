import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Psicologia2Component } from './psicologia-2.component';

describe('Psicologia2Component', () => {
  let component: Psicologia2Component;
  let fixture: ComponentFixture<Psicologia2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Psicologia2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Psicologia2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
