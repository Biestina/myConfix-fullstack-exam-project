import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigModel } from 'src/app/models/config.model';
import { Category, HardwareModel } from 'src/app/models/hardware.model';
import { CategoryService } from 'src/app/services/category.service';
import { ConfigService } from 'src/app/services/config.service';
import { ConfigHttpService } from 'src/app/services/http/config-http.service';
import { HardwareHttpService } from 'src/app/services/http/hardware-http.service';

@Component({
  selector: 'app-config-details',
  templateUrl: './config-details.component.html',
  styleUrls: ['./config-details.component.scss'],
})
export class ConfigDetailsComponent implements OnInit {
  _id!: any;
  currentConfig!: ConfigModel;

  detailsForm!: FormGroup;
  categories!: string[];
  hardwares!: HardwareModel[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private hwService: HardwareHttpService,
    private configService: ConfigHttpService
  ) {}

  ngOnInit(): void {
    this.detailsForm = new FormGroup({
      case: new FormControl(''),
      cpu: new FormControl(''),
      gpu: new FormControl(''),
      motherboard: new FormControl(''),
      monitor: new FormControl(''),
      psu: new FormControl(''),
      ram: new FormControl(''),
      storage: new FormControl(''),
    });

    this._id = this.activatedRoute.snapshot.paramMap.get('id');
    this.currentConfig = this.detailsForm.value;
    this.categories = this.categoryService.categories;
    this.hwService.findAll().subscribe((res) => {
      this.hardwares = res;
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      let readParam = params.get('id');
      if (readParam) {
        this._id = readParam;
        this.configService.findById(this._id).subscribe({
          next: (config: ConfigModel) => {
            this.currentConfig = config;
            this.detailsForm.patchValue(this.currentConfig);
          },
        });
      }
    });
  }

  //TODO update() debug (néha csak refresh után változik )
  update(id: any, config: ConfigModel) {
    this.configService.update(id, config).subscribe(() => {
        this.currentConfig = this.detailsForm.value
      })
      console.log(`Config ID ${this._id} updated`);
      this.router.navigate(['myconfigs'])
  };

  delete(id: any){
    if(confirm('Are you sure you want to delete this config?')){
      this.configService.delete(id).subscribe();
      console.log(`Config ID ${id} has been deleted`);
      this.router.navigate(['myconfigs'])
    }
  }
}
