import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ConfigModel } from 'src/app/models/config.model';
import { Category, HardwareModel } from 'src/app/models/hardware.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ConfigService } from 'src/app/services/config.service';
import { ConfigHttpService } from 'src/app/services/http/config-http.service';
import { HardwareHttpService } from 'src/app/services/http/hardware-http.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent implements OnInit, OnDestroy {
  configForm!: FormGroup;
  sub?: Subscription;
  hardwares!: HardwareModel[];
  categories!: string[];
  
  newConfig: ConfigModel | any = {};
  ckeys: any;
  cvalues: any;
  
  user!: UserModel | null;
  userId!: string
  // myConfigs!: Observable<ConfigModel[]>;

  constructor(
    private hwService: HardwareHttpService,
    private configService: ConfigHttpService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService
  ) {
    this.auth.me().subscribe();
      this.activatedRoute.paramMap.subscribe({
        next: params => {
          this.userId = params.get('userId')!;
        }
      })
  }

  ngOnInit(): void {
    this.configForm = new FormGroup({
      case: new FormControl(''),
      cpu: new FormControl(''),
      gpu: new FormControl(''),
      motherboard: new FormControl(''),
      monitor: new FormControl(''),
      psu: new FormControl(''),
      ram: new FormControl(''),
      storage: new FormControl(''),
    });

    this.getMe();
    this.sub = this.auth.userObject.subscribe((user) => {
      this.user = user;
    });

    this.categories = this.categoryService.categories;
    // this.myConfigs = this.configService.getUserConfigs(this.user?._id!);
    this.hwService.findAll().subscribe((res) => {
      this.hardwares = Object.values(res);
    });

  };

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  };

  //TODO debug
  create() {
    const configLog = this.configForm.value;
    this.configService.create(configLog).subscribe(() => {
        this.router.navigate(['myconfigs', 'user', this.user?._id]);
      }
    );
  }

  createConfigToUser() {
    const configLog = this.configForm.value;
    console.log('configlog: ', configLog);
    this.configService.createConfigToUser(configLog, this.user?._id!).subscribe({
    // this.configService.createConfigToUser(configLog, this.userId).subscribe({
      next: (savedConfig: ConfigModel) => {
        console.log('new config created');
        console.log(savedConfig);
        this.router.navigate(['configs', this.user?._id, 'myconfigs']);
      },
      error: (err) => console.log(err)
    })
  };

  onChange($event: any, category: string) {
    if (this.newConfig.hasOwnProperty(category)) {
      this.newConfig[category] = $event.target.value as string;
    }
    this.newConfig[$event.target.name] = $event.target.value;

    this.ckeys = Object.keys(this.newConfig);
    this.cvalues = Object.values(this.newConfig);
  }

  getMe() {
    if (localStorage.getItem('accessToken')) {
      this.sub = this.auth.me().subscribe();
    }
  }



}
