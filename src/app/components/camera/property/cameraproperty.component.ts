import { AfterViewInit, SimpleChanges, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CameraProperty } from '../../../models/camera/cameraproperty';

@Component({
  selector: 'app-cameraproperty',
  templateUrl: './cameraproperty.component.html',
  styleUrls: ['./cameraproperty.component.css']
})

export class CameraPropertyComponent implements OnChanges, AfterViewInit {
  @ViewChild('cameraProperty') element: ElementRef;
  @Input() property!: CameraProperty;
  @Input() descriptors!: any[];
  @Input() lastUpdated!: number;

  descriptor: any;
  animClass: string = "";

  constructor() { }

  ngOnInit() {
    // Find appropriate property descriptor
    for (let descriptor of this.descriptors) {
      if (descriptor.id == this.property.id) {
        this.descriptor = descriptor;
        break;
      }
    }
  }

  ngAfterViewInit() {
    this.element.nativeElement.addEventListener('animationend', () => {
      this.animClass = "";
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const ch = changes ? changes['lastUpdated'] : null;

    if (ch && ch.previousValue && ch.previousValue !== ch.currentValue) {
      console.log("Got a change ", ch.previousValue, "->", ch.currentValue);
      this.animClass = "xyz-in";
    }
  }
}
