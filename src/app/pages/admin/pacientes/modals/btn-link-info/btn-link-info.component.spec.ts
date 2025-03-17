import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnLinkInfoComponent } from './btn-link-info.component';

describe('BtnLinkInfoComponent', () => {
  let component: BtnLinkInfoComponent;
  let fixture: ComponentFixture<BtnLinkInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnLinkInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnLinkInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
