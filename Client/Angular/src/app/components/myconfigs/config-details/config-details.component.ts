import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfigModel } from 'src/app/models/config.model';
import { Category, HardwareModel } from 'src/app/models/hardware.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ConfigService } from 'src/app/services/config.service';
import { ConfigHttpService } from 'src/app/services/http/config-http.service';
import { HardwareHttpService } from 'src/app/services/http/hardware-http.service';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
  selector: 'app-config-details',
  templateUrl: './config-details.component.html',
  styleUrls: ['./config-details.component.scss'],
})
export class ConfigDetailsComponent implements OnInit, OnDestroy {
  userId!: string | null;
  configId!: string | null;
  currentConfig!: ConfigModel;

  detailsForm!: FormGroup;
  categories!: string[];
  hardwares!: HardwareModel[];

  sub1?: Subscription;
  sub2?: Subscription;
  sub3?: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private hwService: HardwareHttpService,
    private configService: ConfigHttpService,
    private userService: UserHttpService,
    private auth: AuthService
  ) {
    this.auth.me().subscribe();
    this.configId = this.activatedRoute.snapshot.paramMap.get('configId');
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId');
  }

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

    this.currentConfig = this.detailsForm.value;
    this.categories = this.categoryService.categories;
    this.sub1 = this.hwService.findAll().subscribe((res) => {
      this.hardwares = res;
    });

    if (this.userId && this.configId) {
      this.sub2 = this.configService
        .getMyItem(this.userId, this.configId)
        .subscribe({
          next: (config: ConfigModel) => {
            this.currentConfig = config;
            this.detailsForm.patchValue(this.currentConfig);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
  }

  updateMyConfig(userId: string, configId: string, config: ConfigModel) {
    if (userId && configId) {
      this.sub3 = this.configService
        .updateMyItem(userId, configId, config)
        .subscribe({
          next: () => {
            this.currentConfig = this.detailsForm.value;
          },
        });
      this.router.navigate(['configs', this.userId, 'myconfigs']);
    }
  }

  deleteMyConfig(userId: string, configId: string) {
    if (userId) {
      if (configId && confirm('Are you sure you want to delete your config?')) {
        this.sub3 = this.configService
          .deleteMyItem(userId, configId)
          .subscribe();
      }
      this.router.navigate(['configs', this.userId, 'myconfigs']);
    }
  }
}
