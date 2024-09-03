import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewEventComponent } from './modal-view-event.component';

describe('ModalViewEventComponent', () => {
  let component: ModalViewEventComponent;
  let fixture: ComponentFixture<ModalViewEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalViewEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
