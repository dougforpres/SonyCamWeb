import { CameraProperty } from '../camera/cameraproperty';

export interface Device {
  id: string;// = '';
  manufacturer: string;// = '';
  model: string;// = '';
  registryPath: string;// = '';

  handle: number;// = 0;
  propertyDescriptors: any[];
  properties: Map<number, CameraProperty>;
}
