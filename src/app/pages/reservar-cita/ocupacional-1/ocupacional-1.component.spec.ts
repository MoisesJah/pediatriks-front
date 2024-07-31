import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ocupacional1Component } from './ocupacional-1.component';

describe('Ocupacional1Component', () => {
  let component: Ocupacional1Component;
  let fixture: ComponentFixture<Ocupacional1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ocupacional1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ocupacional1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
