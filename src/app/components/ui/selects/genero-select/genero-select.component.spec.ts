import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroSelectComponent } from './genero-select.component';

describe('GeneroSelectComponent', () => {
  let component: GeneroSelectComponent;
  let fixture: ComponentFixture<GeneroSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneroSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneroSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
