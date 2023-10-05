import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesComponent } from './device.component';

describe('DeviceComponent', () => {
  let component: DevicesComponent;
  let fixture: ComponentFixture<DevicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevicesComponent]
    });
    fixture = TestBed.createComponent(DevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
