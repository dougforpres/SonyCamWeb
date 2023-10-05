import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceComponent } from './components/device/device.component';
import { DeviceListComponent } from './components/devicelist/devicelist.component';
import { CameraComponent } from './camera/camera.component';
import { CameraPropertyComponent } from './components/camera/property/cameraproperty.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DeviceListComponent,
    DeviceComponent,
    CameraComponent,
    CameraPropertyComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
