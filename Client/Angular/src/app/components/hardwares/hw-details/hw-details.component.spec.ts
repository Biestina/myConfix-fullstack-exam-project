import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HwDetailsComponent } from './hw-details.component';

describe('HwDetailsComponent', () => {
  let component: HwDetailsComponent;
  let fixture: ComponentFixture<HwDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HwDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HwDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
