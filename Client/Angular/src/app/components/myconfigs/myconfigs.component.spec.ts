import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyconfigsComponent } from './myconfigs.component';

describe('MyconfigsComponent', () => {
  let component: MyconfigsComponent;
  let fixture: ComponentFixture<MyconfigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyconfigsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyconfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
