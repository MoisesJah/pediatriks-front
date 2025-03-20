import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHistorialComponent } from './table-historial.component';

describe('TableHistorialComponent', () => {
  let component: TableHistorialComponent;
  let fixture: ComponentFixture<TableHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
