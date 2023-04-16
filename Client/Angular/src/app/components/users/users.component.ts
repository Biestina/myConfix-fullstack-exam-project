import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users!: UserModel[];
  sub!: Subscription;
  // TODO guard

  constructor(private http: HttpClient, private userService: UserHttpService) { }
  
  ngOnInit(): void {
    this.sub = this.userService.findAll().subscribe({
      next: res => this.users = res
    })
  };
  
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  };
}
