import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fisica2Component } from './fisica-2.component';

describe('Fisica2Component', () => {
  let component: Fisica2Component;
  let fixture: ComponentFixture<Fisica2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Fisica2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fisica2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
