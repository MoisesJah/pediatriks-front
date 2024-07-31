import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ocupacional3Component } from './ocupacional-3.component';

describe('Ocupacional3Component', () => {
  let component: Ocupacional3Component;
  let fixture: ComponentFixture<Ocupacional3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ocupacional3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ocupacional3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
