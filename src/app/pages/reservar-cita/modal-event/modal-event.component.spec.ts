import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateEventComponent } from './modal-event.component';

describe('ModalEventComponent', () => {
  let component: ModalCreateEventComponent;
  let fixture: ComponentFixture<ModalCreateEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCreateEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
