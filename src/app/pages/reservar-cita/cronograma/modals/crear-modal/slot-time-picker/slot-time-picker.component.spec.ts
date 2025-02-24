import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotTimePickerComponent } from './slot-time-picker.component';

describe('SlotTimePickerComponent', () => {
  let component: SlotTimePickerComponent;
  let fixture: ComponentFixture<SlotTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlotTimePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
