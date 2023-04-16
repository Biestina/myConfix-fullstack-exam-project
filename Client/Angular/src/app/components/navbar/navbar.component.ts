import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user!: UserModel | null;
  sub!: Subscription
  
  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    // this.sub = this.authService.userObject.subscribe((user)=> {
    //   this.user = user;
    //   console.log(user);
    // });
    // if(this.user){
    //   this.getMe();
    // }

    // if(this.user){
        this.getMe();
      // }
    this.authService.userObject.subscribe((user)=> {
      this.user = user
    })
  };

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
    // this.authService.me().subscribe()
  }

  getMe(){
    if(localStorage.getItem('accessToken')){
      this.sub = this.authService.me().subscribe()
      // this.authService.me().subscribe()
    }
  }

}
