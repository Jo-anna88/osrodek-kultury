import {inject} from "@angular/core";
import {UserService} from "../../services/user.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {defaultIfEmpty, delayWhen, filter, map, Observable, timer} from "rxjs";
import {AlertService} from "../../../modules/alert/alert.service";
import {AuthService} from "../auth.service";

export const authGuard = (routeSnapshot: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const alertService: AlertService = inject(AlertService);
  const authService: AuthService = inject(AuthService);

  authService.initAuthStatus(); // for browser refresh surviving
  return authService.isAuthenticated$.pipe(
    filter((isAuthenticated) => isAuthenticated !== undefined), // for slow connection with backend
    map((isAuthenticated) => {
      console.log("Auth guard - is authenticated?: ", isAuthenticated);
      if (!isAuthenticated) { // isAuthenticated = false
        console.log("Auth guard - user is NOT authenticated");
        alertService.error("Username or password is incorrect. \nPlease try again.")
        router.navigate(['/login'], {queryParams: {requested: routerState.url}});
        return false;
      }
      console.log("Auth guard - user is authenticated");
      return true;
    })
  )
}
