import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprarModalComponent } from './comprar-modal.component';

describe('ComprarModalComponent', () => {
  let component: ComprarModalComponent;
  let fixture: ComponentFixture<ComprarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComprarModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
