import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // constructor(private authService: AuthService, private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
    // this.router.navigate(['login']);
    // return this.authService.userObject.value !== null;

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
