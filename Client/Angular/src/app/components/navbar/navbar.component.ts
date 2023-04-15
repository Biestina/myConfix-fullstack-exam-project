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
    this.sub = this.authService.userObject.subscribe((user)=> {
      this.user = user;
      console.log(user);
    });
    if(this.user){
      this.getMe();
    }
  };

  ngOnDestroy(): void {
    // if(this.sub){
    //   this.sub.unsubscribe();
    // }
  }

  getMe(){
    if(localStorage.getItem('accessToken')){
      this.authService.me().subscribe()
    }
  }

}
