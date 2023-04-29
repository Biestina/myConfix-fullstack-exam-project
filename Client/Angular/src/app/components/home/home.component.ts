import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  userId?: string;
  sub!: Subscription

  constructor(private activatedRoute: ActivatedRoute, private auth: AuthService) {
    this.auth.me().subscribe();
    this.sub = this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.userId = params.get('userId')!;
      },
    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
