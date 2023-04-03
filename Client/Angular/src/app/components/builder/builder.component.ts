import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConfigModel } from 'src/app/models/config.model';
import { Category, HardwareModel } from 'src/app/models/hardware.model';
import { ConfigService } from 'src/app/services/config.service';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  subscription?: Subscription;
  hardwares!: HardwareModel[];
  categories: string[] = ['Case', 'CPU', 'GPU', 'Motherboard', 'Monitor', 'PSU', 'RAM', 'Storage'];
  myCategories!: Category[];
  configs!: ConfigModel[];
  newConfig!: ConfigModel;
  configForm!: FormGroup;


  constructor(private hwService: HardwareService, private configService: ConfigService) { }

  ngOnInit(): void {
    // this.subscription = this.hwService.getHardwares().subscribe((res) => {
    this.hwService.getHardwares().subscribe((res) => {
      this.hardwares = Object.values(res);
      // console.log(this.hardwares);
    });

    this.configService.findAll().subscribe((res) => {
      this.configs = Object.values(res)
    });

    console.log(this.configService.findCat().subscribe((res) => {
      this.myCategories = Object.values(res);
      console.log(Object.keys(res[0]));
      console.log(Object.values(res[0].Case));
      console.log(res[0].Case);
      console.log(res);
    }))

  };


  create(){
    this.configService.create(this.newConfig).subscribe({
      next: (savedConfig: ConfigModel) => {
        // this.configs?.push(savedConfig);
        console.log('new empty config created');
      },
      error: (err) => console.log(err)
    })
  }

  // filtered(category: string): HardwareModel[] {
  //     return this.hardwares.filter(hw => hw.category === category.toLowerCase)
  // }
}
