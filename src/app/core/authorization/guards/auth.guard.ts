import {inject} from "@angular/core";
import {UserService} from "../../services/user.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {filter, map, Observable} from "rxjs";
import {AlertService} from "../../../modules/alert/alert.service";

export const authGuard = (routeSnapshot: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const alertService = inject(AlertService);
  console.log("auth guard");
  return userService.user$.pipe(

    filter((user) => user !== undefined), //it should be sth like -> if user is undefined wait for 3s
    map((user) => {
      console.log("User in auth gard: " + user);
      if (!user) { // user is falsy
        //if(user != null && Object.keys(user).length===0){ // != null checks for null and undefined
        console.log("user is null")
        alertService.error("Username or password is incorrect. \nPlease try again.")
        router.navigate(['/login'], {queryParams: {requested: routerState.url}});
        return false;
      }
      console.log("User is logged in");
      return true;
    })
  )
  // todo: no component is rendered in place of router-outlet if user is always undefined
  //  it can happen if user types 'http://localhost:4200/landing-page' in address bar

}
