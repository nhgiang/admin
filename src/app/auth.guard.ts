import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators';
import { storageUtils } from 'src/utils/storage';
import { AuthApiService } from './api/auth.api.service';
import { AuthenticationService } from './services/authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = storageUtils.get('token')
    if (token) {
      return true
    }
    this.router.navigate(['/auth'])
    return
  }
}
