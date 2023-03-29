import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-hardwares',
  templateUrl: './hardwares.component.html',
  styleUrls: ['./hardwares.component.scss']
})
export class HardwaresComponent implements OnInit {
  hardwares: any;

  @ViewChild('eachHardware') eachHardware!: ElementRef;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const url: string = '../../../../assets/data.json';
    this.http.get(url).subscribe(res => {
      this.hardwares = res;

      console.log(this.hardwares);
      console.log(this.eachHardware.nativeElement.innerHTML);
      console.log(this.eachHardware.nativeElement.value);
    })
  }

}
