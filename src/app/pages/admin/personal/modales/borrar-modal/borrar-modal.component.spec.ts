import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarModalComponent } from './borrar-modal.component';

describe('BorrarModalComponent', () => {
  let component: BorrarModalComponent;
  let fixture: ComponentFixture<BorrarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BorrarModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
