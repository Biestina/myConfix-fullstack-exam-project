import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HwDetailsComponent } from './hw-details/hw-details.component';
import { HardwareModel } from '../../../models/hardware.model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HardwareHttpService } from 'src/app/services/http/hardware-http.service';

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

  constructor(private http: HttpClient, private hwService: HardwareHttpService) {}

  ngOnInit(): void {
    // const url: string = '../../../../assets/data.json';
    // const getHardwares: Observable<Object> = this.http.get(url);
    // this.subscription = getHardwares.subscribe(res => {
    //     this.hardwares = Object.values(res);
    // })

    //* async nélkül
    this.subscription = this.hwService.findAll().subscribe({
      next: (res) => {
        this.hardwares = res;
      },
      error: err => console.log(err)
    });

    //async off xd
    // this.hardwares = this.hwService.findAll();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
