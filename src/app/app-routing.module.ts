import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceListComponent } from "./components/devicelist/devicelist.component";
import { CameraComponent } from "./camera/camera.component";

const routes: Routes = [
  { path: 'device', component: DeviceListComponent },
  { path: 'camera', component: CameraComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
