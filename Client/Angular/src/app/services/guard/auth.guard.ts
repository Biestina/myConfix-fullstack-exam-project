import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogged = this.authService.userObject.value !== null;
    if(!isLogged){
      alert('You have to sign in!');
      this.router.navigate(['login']);
      // return false
    }
    return isLogged;

    return this.authService.userObject.value !== null ;
    return this.authService.me().pipe(map(user => {
      console.log(user);
      console.log(user.user);
        return user.user ? true : false;
      }))

      //TODO ?
    // const userLoggedin = false;
    // if(!userLoggedin){
    //   alert('You have to sign in!');
    //   this.router.navigate(['login']);
    //   return false;
    // } else {
    //   return true;
    // }

  }
  
}
