import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaegresosModalComponent } from './tablaegresos-modal.component';

describe('TablaegresosModalComponent', () => {
  let component: TablaegresosModalComponent;
  let fixture: ComponentFixture<TablaegresosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaegresosModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaegresosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
