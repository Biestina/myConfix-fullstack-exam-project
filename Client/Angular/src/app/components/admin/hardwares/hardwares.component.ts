import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HwDetailsComponent } from './hw-details/hw-details.component';
import { HardwareModel } from '../../../models/hardware.model'
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-hardwares',
  templateUrl: './hardwares.component.html',
  styleUrls: ['./hardwares.component.scss']
})
export class HardwaresComponent implements OnInit, OnDestroy {

  hardwares!: HardwareModel[];
  selectedHwName?: string;
  subscription?: Subscription;
  // @ViewChild(HwDetailsComponent) hwDetailsComponent!: HwDetailsComponent;
  // @ViewChild('infoModal', { static: false }) infoModal!: ElementRef;

  showMoreInfo(hwName: string){
    this.selectedHwName = hwName;
    // this.hwDetailsComponent.show();
    // this.hwDetailsComponent.ngOnInit
    // this.hwDetailsComponent['show']();
  };

  get selectedHardware(): HardwareModel | void {
    if(this.hardwares){
      return this.hardwares.find((hw: HardwareModel) => hw.name === this.selectedHwName)
    }
  };

  // destroyChild(){
  //   if(this.hwDetailsComponent){
  //     // this.hwDetailsComponent.ngOnDestroy();
  //   }
  // }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // console.log('oninit');
    const url: string = '../../../../assets/data.json';
    const getHardwares: Observable<Object> = this.http.get(url);
    this.subscription = getHardwares.subscribe(res => {
        // console.log(Object.keys(res));   // indexek
        // console.log(Object.values(res));
        this.hardwares = Object.values(res);
      // console.log(this.eachHardware.nativeElement.innerHTML);
      // console.log(this.eachHardware.nativeElement.value);
    })
  };

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
      console.log('destroyed');
    }
  }
}
