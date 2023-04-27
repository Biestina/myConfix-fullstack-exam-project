import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy, OnChanges {
  user!: UserModel | null;
  sub!: Subscription;
  sub2!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getMe();
    this.sub2 = this.authService.userObject.subscribe((user) => {
      this.user = user;
    });
    console.log(this.user);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getMe();
    this.sub2 = this.authService.userObject.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  getMe() {
    if (localStorage.getItem('accessToken')) {
      this.sub = this.authService.me().subscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.authService.userObject.next(null);
    this.router.navigate(['']);
  }
}
