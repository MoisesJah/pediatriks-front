import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrasModalComponent } from './extras-modal.component';

describe('ExtrasModalComponent', () => {
  let component: ExtrasModalComponent;
  let fixture: ComponentFixture<ExtrasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtrasModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtrasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
