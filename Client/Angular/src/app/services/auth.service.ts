import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

export interface userLogModel {
  accessToken: string;
  refreshToken: string;
  user: UserModel
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = environment.apiUrl;

  private _userObject = new BehaviorSubject<UserModel | null>(null);
  
  constructor(private http: HttpClient) { }

  login(userLog: any): Observable<userLogModel> {
    return this.http.post<userLogModel>(`${this.BASE_URL}login`, userLog).pipe(
      tap(loginData => {
        if(loginData.accessToken && loginData.refreshToken){
          localStorage.setItem('accessToken', loginData.accessToken);
          localStorage.setItem('refreshToken', loginData.refreshToken);
        }
        this._userObject.next(loginData.user)
        // this._userObject.next(null)
      })
    )
  };

  //TODO refresh + refreshtoken?
  // refresh(): Observable<{accessToken: string}> {
  //   const refreshToken = localStorage.getItem('refreshToken')
  // ...
  // }

  logout(){
    //TODO ha lesz refreshtoken
    // const refreshToken = localStorage.getItem('refreshToken');
    // localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    // this.http.post(`${this.BASE_URL}logout`, {refreshToken})
  }


  get userObject(): BehaviorSubject<UserModel | null>{
    return this._userObject;
  };

  me(): Observable<{user: UserModel}>{
    return this.http.get<{user: UserModel}>(`${this.BASE_URL}me`).pipe(
      tap(user => {
        console.log(user);
        console.log('userObject?');
        this._userObject.next(user.user);
      })
    )
  };
}
