import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfigModel } from 'src/app/models/config.model';
import { Category, HardwareModel } from 'src/app/models/hardware.model';
import { CategoryService } from 'src/app/services/category.service';
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
  categories!: string[];
  myCategories!: Category[];
  configForm!: FormGroup;

  newConfig: ConfigModel | any = { };
  ckeys: any;
  cvalues: any;


  constructor(private hwService: HardwareService, 
    private configService: ConfigService, 
    private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.configForm = new FormGroup({
      case: new FormControl(),
      cpu: new FormControl(''),
      gpu: new FormControl(''),
      motherboard: new FormControl(''),
      monitor: new FormControl(''),
      psu: new FormControl(''),
      ram: new FormControl(''),
      storage: new FormControl(''),
    });

    this.categories = this.categoryService.categories;
    
    // this.subscription = this.hwService.getHardwares().subscribe((res) => {
    this.hwService.findAll().subscribe((res) => {
      this.hardwares = Object.values(res);
      // console.log(this.hardwares);
    });

    

    console.log(this.configService.findCat().subscribe((res) => {
      this.myCategories = Object.values(res);
      // console.log(Object.keys(res[0]));
    }))

  };


  create(){
    const configLog = this.configForm.value;
    // this.configService.create(this.newConfig).subscribe({
    this.configService.create(configLog).subscribe({
      next: (savedConfig: ConfigModel) => {
        console.log('new config created');
        this.router.navigate(['myconfigs'])
      },
      error: (err) => console.log(err)
    })
  };

  onChange($event: any, category: string) {
    // console.log($event.target.name);
    // console.log($event.target.value);
    if(this.newConfig.hasOwnProperty(category)){
      this.newConfig[category] = $event.target.value as string;
    }
    this.newConfig[$event.target.name] = $event.target.value;
    // console.log(this.newConfig);

    this.ckeys = Object.keys(this.newConfig);
    this.cvalues = Object.values(this.newConfig);
    // console.log(this.cvalues);
  };



  // filtered(category: string): HardwareModel[] {
  //     return this.hardwares.filter(hw => hw.category === category.toLowerCase)
  // }
}
