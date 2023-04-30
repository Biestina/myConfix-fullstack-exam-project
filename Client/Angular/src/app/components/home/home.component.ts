import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  userId?: string;
  subscription!: Subscription

  constructor(private activatedRoute: ActivatedRoute, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.auth.userObject.subscribe({
      next: (user) => {
        if (user) {
          this.userId = user._id;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
