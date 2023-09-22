import {inject} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {filter, map} from "rxjs";

export const authGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  return userService.user$.pipe(
    filter((user) => user !== undefined),
    map((user) => {
    if (!user) {
      router.navigateByUrl('/');
      return false
    }
    return true;
  }))
}
