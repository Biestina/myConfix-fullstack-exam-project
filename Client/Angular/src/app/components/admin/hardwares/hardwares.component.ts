import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HwDetailsComponent } from './hw-details/hw-details.component';
import { HardwareModel } from './models/hardware.model';

@Component({
  selector: 'app-hardwares',
  templateUrl: './hardwares.component.html',
  styleUrls: ['./hardwares.component.scss']
})
export class HardwaresComponent implements OnInit {

  hardwares: HardwareModel[];

  selectedHwName: string;
  // @ViewChild('eachHardware') eachHardware!: ElementRef;
  @ViewChild(HwDetailsComponent) hwDetailsComponent: HwDetailsComponent;

  showMoreInfo(hwName: string){
    this.selectedHwName = hwName;
    this.hwDetailsComponent.show();
  };

  get selectedHardware(): HardwareModel {
    return this.hardwares.find(hw => hw.name === this.selectedHwName)
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const url: string = '../../../../assets/data.json';
    this.http.get(url).subscribe(res => {
      this.hardwares = res;
      console.log(this.hardwares);
      // console.log(this.eachHardware.nativeElement.innerHTML);
      // console.log(this.eachHardware.nativeElement.value);
    })
  }

}
