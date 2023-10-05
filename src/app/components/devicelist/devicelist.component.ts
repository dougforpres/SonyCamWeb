import { Component, OnInit } from '@angular/core';
import { Device } from '../../models/device/device';
import { DeviceService } from '../../services/device/device.service';

@Component({
  selector: 'app-devicelist',
  templateUrl: './devicelist.component.html',
  styleUrls: ['./devicelist.component.css']
})

export class DeviceListComponent implements OnInit {
  constructor(private deviceService: DeviceService) { }

  previewRunning: boolean;
  selectedDevice: Device = null;
  devices: Device[] = [];
  latestPreview: any;

  async getDevices() {
    console.log("Getting list of devices")
    this.devices = await this.deviceService.getDevices();
    console.log("Got some stuffs:", this.devices)
  }

  async ngOnInit() {
    await this.getDevices();
  }
}
