import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HardwareModel } from 'src/app/models/hardware.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HardwareHttpService extends BaseHttpService<HardwareModel> {

  constructor(http: HttpClient) {
    super(http, 'hardwares')
   }
}
