import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HwDetailsComponent } from './hw-details/hw-details.component';
import { HardwareModel } from '../../../models/hardware.model';
import { Observable, Subscription } from 'rxjs';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-hardwares',
  templateUrl: './hardwares.component.html',
  styleUrls: ['./hardwares.component.scss'],
})
export class HardwaresComponent implements OnInit, OnDestroy {
  hardwares!: HardwareModel[];
  selectedHwName?: string;
  subscription!: Subscription;
  // @ViewChild(HwDetailsComponent) hwDetailsComponent!: HwDetailsComponent;
  // @ViewChild('infoModal', { static: false }) infoModal!: ElementRef;

  showMoreInfo(hwName: string) {
    this.selectedHwName = hwName;
    // this.hwDetailsComponent.show();
    // this.hwDetailsComponent.ngOnInit
    // this.hwDetailsComponent['show']();
  }

  get selectedHardware(): HardwareModel | void {
    if (this.hardwares) {
      return this.hardwares.find(
        (hw: HardwareModel) => hw.name === this.selectedHwName
      );
    }
  }

  // destroyChild(){
  //   if(this.hwDetailsComponent){
  //     // this.hwDetailsComponent.ngOnDestroy();
  //   }
  // }

  constructor(private http: HttpClient, private hwService: HardwareService) {}

  ngOnInit(): void {
    // const url: string = '../../../../assets/data.json';
    // const getHardwares: Observable<Object> = this.http.get(url);
    // this.subscription = getHardwares.subscribe(res => {
    //     this.hardwares = Object.values(res);
    // })
    this.subscription = this.hwService.findAll().subscribe({
      next: (res) => {
        this.hardwares = res;
        // console.log(this.hardwares);
      },
      error: err => console.log(err)
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
