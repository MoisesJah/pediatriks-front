import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fisica3Component } from './fisica-3.component';

describe('Fisica3Component', () => {
  let component: Fisica3Component;
  let fixture: ComponentFixture<Fisica3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Fisica3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fisica3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
