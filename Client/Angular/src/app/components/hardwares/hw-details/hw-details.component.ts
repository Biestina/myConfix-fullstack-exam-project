import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { HardwareModel } from '../../../models/hardware.model'

@Component({
  selector: 'app-hw-details',
  templateUrl: './hw-details.component.html',
  styleUrls: ['./hw-details.component.scss']
})
export class HwDetailsComponent implements OnInit, OnChanges {

  @Input() hardware!: HardwareModel | void;
  keys!: string[];
  values!: string[];
  
  constructor() { }
  
  ngOnInit(): void {
  };
  
  ngOnChanges(changes: SimpleChanges): void {
    if(this.hardware){
      this.keys = Object.keys(this.hardware).filter(key => key !== '_id');
      this.values = Object.values(this.hardware).filter(value => value !== this.hardware?._id);
    }
  };

}
