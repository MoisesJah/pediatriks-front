import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PediasuitComponent } from './pediasuit.component';

describe('PediasuitComponent', () => {
  let component: PediasuitComponent;
  let fixture: ComponentFixture<PediasuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PediasuitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PediasuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
