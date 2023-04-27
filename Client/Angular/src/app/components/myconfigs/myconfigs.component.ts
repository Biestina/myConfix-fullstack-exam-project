import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigModel } from 'src/app/models/config.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigHttpService } from 'src/app/services/http/config-http.service';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
  selector: 'app-myconfigs',
  templateUrl: './myconfigs.component.html',
  styleUrls: ['./myconfigs.component.scss'],
})
export class MyconfigsComponent implements OnInit {
  configs!: ConfigModel[];
  user!: UserModel | null;
  userId!: string;

  constructor(
    private configService: ConfigHttpService,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.auth.me().subscribe();
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.userId = params.get('userId')!;
      },
    });
  };

  ngOnInit(): void {
    this.auth.userObject.subscribe((user) => {
      this.user = user;
    });
    this.configService.getMyList(this.userId).subscribe((res) => {
      this.configs = res;
    });
  };

}
