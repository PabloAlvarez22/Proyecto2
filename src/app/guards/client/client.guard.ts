import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token = this.restUser.getToken();
      if(!token || token==undefined){
        this.router.navigateByUrl("")
        return false;
      }else{
        return true;
      }
  }
  constructor(public restUser:RestUserService, private router:Router){}

  
}
