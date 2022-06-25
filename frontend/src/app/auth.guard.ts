import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "./models/user";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let loginUser: User = JSON.parse(localStorage.getItem("loginUser"));
    if (!loginUser) this.router.navigate([""]);
    if (loginUser.type !== route.url[0].path) this.router.navigate(['/' + loginUser.status]);
    return true;
  }

}