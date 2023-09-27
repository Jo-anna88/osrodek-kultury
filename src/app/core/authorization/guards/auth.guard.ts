import {inject} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {filter, map, Observable} from "rxjs";

export const authGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  console.log("auth guard");
  return userService.user$.pipe(
    filter((user) => user !== undefined), // TODO: it does not work when user is defined but has wrong pswd or login (null is returned for user)
    map((user) => {
      console.log("User in auth gard: " + user);
    if (!user) { // user is falsy
    //if(user != null && Object.keys(user).length===0){ // != null checks for null and undefined
      console.log("user is null")
      router.navigate(['/login']);
      return false;
    }
    console.log("User is logged in");
    return true;
  })
  )
}
