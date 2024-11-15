import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaingresosModalComponent } from './tablaingresos-modal.component';

describe('TablaingresosModalComponent', () => {
  let component: TablaingresosModalComponent;
  let fixture: ComponentFixture<TablaingresosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaingresosModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaingresosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
