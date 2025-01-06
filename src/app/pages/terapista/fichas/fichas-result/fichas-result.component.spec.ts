import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichasResultComponent } from './fichas-result.component';

describe('FichasResultComponent', () => {
  let component: FichasResultComponent;
  let fixture: ComponentFixture<FichasResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichasResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichasResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
