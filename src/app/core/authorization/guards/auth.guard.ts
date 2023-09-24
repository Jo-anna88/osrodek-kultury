import {inject} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {filter, map} from "rxjs";

export const authGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  console.log("auth guard");
  return userService.user$.pipe(
    filter((user) => user !== undefined),
    map((user) => {
    if (!user) {
      router.navigateByUrl('/login');
      return false;
    }
    return true;
  }))
}
