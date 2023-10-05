import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Device } from '../../models/device/device';
import { CameraProperty } from '../../models/camera/cameraproperty';
import { DeviceService } from '../../services/device/device.service';
import { BehaviorSubject } from 'rxjs';

enum State {
  Null,
  Created,
  Opening,
  Open,
  Closing,  // Moves to "Created"
  Polling
}

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})

export class DeviceComponent implements OnDestroy {
  @Input() device!: Device;

  state: State = State.Null;
  closeRequested: boolean = false;
  previewRunning: boolean = false;
  previewImage: any;
  ticker: number;
  stateObservable = new BehaviorSubject<State>(State.Null);
  propertyMap = new Map<number, number>();

  constructor(private deviceService: DeviceService) {
    this.state = State.Created;
  }

  ngOnInit() {
    this.device.properties = new Map<number, CameraProperty>();
  }

  async ngOnDestroy() {
    if (this.state == State.Open) {
      await this.close();
      await this.stateObservable.subscribe(state => {
        if (state == State.Created) {
          clearInterval(this.ticker);
          this.stateObservable.unsubscribe();
        }
      });
    }
  }

  setState(newVal: State) {
//    console.log(`Updating state from ${this.state} to ${newVal}`);
    this.state = newVal;
    this.stateObservable.next(newVal);
//    this.stateObservable.pipe
  }

  async open() {
    console.log("Open Clicked on ", this.device);

    this.setState(State.Opening);
    this.closeRequested = false;

    this.device.handle = (await this.deviceService.openDevice(this.device.id)).handle;
    this.device.propertyDescriptors = (await this.deviceService.getPropertyDescriptors(this.device.handle));
    this.setState(State.Open);
    this.ticker = setInterval(() => { this.handleState() }, 1000);
  }

  async handleState() {
    switch (this.state) {
      case State.Open:
        if (this.closeRequested) {
          this.setState(State.Closing);
          await this.deviceService.closeDevice(this.device.handle);
          this.device.handle = 0;
          this.setState(State.Created);
        } else {
          this.setState(State.Polling);
          await this.getProperties();

          if (this.previewRunning) {
            await this.getPreview();
          }
          this.setState(State.Open);
      }
    }
  }

  async close() {
    this.closeRequested = true;
  }

  async startPreview() {
    this.previewRunning = true;
  }

/*  async sleep(millis: number) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => { resolve() }, millis);
    })
  }*/

  async stopPreview() {
    this.previewRunning = false;
  }

  async getPreview() {
    this.previewImage = await this.deviceService.getPreview(this.device.handle);
//    console.log("Preview:", this.previewImage);
  }

  async getProperties() {
    let newProperties = await this.deviceService.getProperties(this.device.handle);

    for (let newProperty of newProperties) {
      let existing = this.device.properties.get(newProperty.id);

      if (!existing) {
        console.log("Added new property", newProperty);
        this.device.properties.set(newProperty.id, newProperty);
        this.propertyMap.set(newProperty.id, new Date().getTime());
      } else if (existing && newProperty.value != existing.value) {
        console.log("Updating", existing, "to", newProperty);
//        this.device.properties.set(newProperty.id, newProperty);
        existing.value = newProperty.value;
        existing.text = newProperty.text;
        this.propertyMap.set(newProperty.id, new Date().getTime());
      }
    }
//    this.device.properties = await this.deviceService.getProperties(this.device.handle);
//    console.log("Properties refreshed:", this.device.properties);
  }
}
