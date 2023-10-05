import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Device } from '../../models/device/device';
import { CameraProperty } from '../../models/camera/cameraproperty';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  async getDevices(): Promise<Device[]> {
    return this.http
      .get<Device[]>(API_URL + '/devices').toPromise()
  }

  async openDevice(id: string): Promise<any> {
    console.log("Trying to open", id);
    return this.http
      .post(API_URL + '/cameras', { id }).toPromise();
  }

  async closeDevice(handle: number): Promise<any> {
    return this.http
      .delete(`${API_URL}/cameras/${handle}`).toPromise()
  }

  async getPropertyDescriptors(handle: number): Promise<any> {
    return this.http
      .get(`${API_URL}/cameras/${handle}/propertyDescriptors`).toPromise()
  }

  async getProperties(handle: number): Promise<CameraProperty[]> {
    return this.http
      .get<CameraProperty[]>(`${API_URL}/cameras/${handle}/properties`).toPromise()
  }

  async getPreview(handle: number): Promise<any> {
    return this.http.get(`${API_URL}/cameras/${handle}/preview`).toPromise()
  }
}
