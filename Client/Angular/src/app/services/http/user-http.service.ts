import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService extends BaseHttpService<UserModel> {
  // private _userList = new BehaviorSubject<UserModel[] | null>(null);

  constructor(http: HttpClient) {
    super(http, 'users');
  }

  // get userList(): BehaviorSubject<UserModel[] | null> {
  //   return this._userList;
  // }
}
