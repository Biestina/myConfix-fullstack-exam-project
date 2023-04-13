import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, map, tap } from 'rxjs';
import { HardwareModel } from '../models/hardware.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HardwareService {

  //TODO hwSubject
  
  // url: string = '../../../../assets/hardwares.json';
  // url: string = 'http://localhost:3000/hardwares';
  BASE_URL = environment.apiUrl;
  hardwares!: HardwareModel[];
  // subscription?: Subscription

  constructor(private http: HttpClient) {
    // this.url += entity;
   }

  // findAll(): Observable<HardwareModel[]>{
  //   // this.subscription = getHardwares.
  //   return this.http.get<HardwareModel[]>(`${this.BASE_URL}`).pipe(
  //     map(hardwares => this.hardwares = Object.values(hardwares)),
  //     tap(hardwares => console.log(this.hardwares)),
  //       // console.log(Object.keys(res));   // indexek
  //       // console.log(Object.values(res));
  //       // console.log(this.hardwares);
  //   )
  // };

  findAll(): Observable<HardwareModel[]>{
    return this.http.get<HardwareModel[]>(`${this.BASE_URL}hardwares`);
  }

}
