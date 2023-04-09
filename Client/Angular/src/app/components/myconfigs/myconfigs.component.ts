import { Component, OnInit } from '@angular/core';
import { ConfigModel } from 'src/app/models/config.model';
import { Category } from 'src/app/models/hardware.model';
import { CategoryService } from 'src/app/services/category.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-myconfigs',
  templateUrl: './myconfigs.component.html',
  styleUrls: ['./myconfigs.component.scss']
})
export class MyconfigsComponent implements OnInit {

  configs!: ConfigModel[];
  categories?: Category[] | string[];
  
  constructor(private configService: ConfigService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.configService.findAll().subscribe((res) => {
      this.configs = Object.values(res);
      // console.log(this.configs);
    });

    this.categories = this.categoryService.categories;

  }
}
