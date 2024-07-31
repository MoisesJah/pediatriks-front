import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ocupacional2Component } from './ocupacional-2.component';

describe('Ocupacional2Component', () => {
  let component: Ocupacional2Component;
  let fixture: ComponentFixture<Ocupacional2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ocupacional2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ocupacional2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
