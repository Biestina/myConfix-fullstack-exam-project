import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, map, tap } from 'rxjs';
import { HardwareModel } from '../models/hardware.model';

@Injectable({
  providedIn: 'root'
})
export class HardwareService {

  //TODO hwSubject
  
  url: string = '../../../../assets/hardwares.json';
  hardwares!: HardwareModel[];
  // subscription?: Subscription

  constructor(private http: HttpClient) { }

  getHardwares(): Observable<HardwareModel[]>{
    // const getHardwares: Observable<Object> = 
    // this.subscription = getHardwares.
    return this.http.get(this.url).pipe(
      // tap(hardwares => console.log(hardwares)),
      // tap(hardwares => console.log(this.hardwares)),
      // tap(hardwares => console.log('this.hardwares')),
      map(hardwares => this.hardwares = Object.values(hardwares)),
      // tap(hardwares => console.log(this.hardwares)),
        // console.log(Object.keys(res));   // indexek
        // console.log(Object.values(res));
        // console.log(this.hardwares);
    )
  }

}
