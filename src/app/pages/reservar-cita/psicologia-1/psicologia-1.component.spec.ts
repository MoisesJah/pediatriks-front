import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Psicologia1Component } from './psicologia-1.component';

describe('Psicologia1Component', () => {
  let component: Psicologia1Component;
  let fixture: ComponentFixture<Psicologia1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Psicologia1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Psicologia1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
