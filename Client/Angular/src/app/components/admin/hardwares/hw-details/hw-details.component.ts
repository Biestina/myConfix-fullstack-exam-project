import { Component, OnInit, Input } from '@angular/core';
import { HardwareModel } from './models/hardware.model';

@Component({
  selector: 'app-hw-details',
  templateUrl: './hw-details.component.html',
  styleUrls: ['./hw-details.component.scss']
})
export class HwDetailsComponent implements OnInit {

  @Input() hardware: HardwareModel;

  constructor() { }

  ngOnInit(): void {
    const keys = Object.keys(this.hardware);
    const values = Object.values(this.hardware);
    console.log(keys);
    console.log(values);
  }

}
