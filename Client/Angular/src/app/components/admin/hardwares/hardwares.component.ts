import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HwDetailsComponent } from './hw-details/hw-details.component';
import { HardwareModel } from '../../../models/hardware.model';
import { Observable, Subscription } from 'rxjs';
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

  showMoreInfo(hwName: string) {
    this.selectedHwName = hwName;
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
    this.subscription = this.hwService.findAll().subscribe({
      next: (res) => {
        this.hardwares = res;
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
