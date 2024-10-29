import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerapistaComponent } from './terapista.component';

describe('TerapistaComponent', () => {
  let component: TerapistaComponent;
  let fixture: ComponentFixture<TerapistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerapistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerapistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
