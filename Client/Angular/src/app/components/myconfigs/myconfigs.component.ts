import { Component, OnInit } from '@angular/core';
import { ConfigModel } from 'src/app/models/config.model';
import { Category } from 'src/app/models/hardware.model';
import { CategoryService } from 'src/app/services/category.service';
import { ConfigService } from 'src/app/services/config.service';
import { ConfigHttpService } from 'src/app/services/http/config-http.service';

@Component({
  selector: 'app-myconfigs',
  templateUrl: './myconfigs.component.html',
  styleUrls: ['./myconfigs.component.scss']
})
export class MyconfigsComponent implements OnInit {

  configs!: any;
  categories?: Category[] | string[];

  
  constructor(
    // private configService: ConfigService, 
    private configService: ConfigHttpService, 
    private categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    // this.configService.findAll().subscribe((res) => {
    //   this.configs = Object.values(res);
    // });     basehttp nélkül

    //* async pipe nélkül
    // this.configService.findAll().subscribe({
    //   next: res => {
    //     this.configs = Object.values(res);
    //     console.log(res);
    //   },
    //   error: err => console.error(err)
    // });

    this.configs = this.configService.findAll();

    this.categories = this.categoryService.categories;

  }
}




// https://source.unsplash.com/random/800x800/?computer


// https://source.unsplash.com/random/800x600/?desktop computer motherboard {{ [i] }}
// https://source.unsplash.com/random/800x600/?gaming+computer {{ [i] }}