import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { User } from 'src/types/model'
import { storageUtils } from 'src/utils/storage'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user$ = new BehaviorSubject<User>(null)

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post<any>(`/users/authenticate`, { username, password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user))
        this.user$.next(user)
        return user
      }))
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    this.user$.next(null)
  }

  refreshToken(): Observable<{ accessToken: string; refreshToken: string }> {
    const refreshToken = storageUtils.get('refreshToken')
    return this.http.post<{ accessToken: string; refreshToken: string }>(
      `${environment.apiUrl}/refresh-token`,
      {
        refreshToken
      }).pipe(
        tap(response => {
          storageUtils.set('token', response.accessToken)
          storageUtils.set('refreshToken', response.refreshToken)
        })
      )
  }

  getCurrentUser(): Observable<User> {
    return this.user$.pipe(
      switchMap(user => {
        // check if we already have user data
        if (user) {
          return of(user)
        }
        const token = storageUtils.get('token')
        // if there is token then fetch the current user
        if (token) {
          return this.fetchCurrentUser()
        }
        return of(null)
      })
    )
  }

  fetchCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/current-user`)
      .pipe(
        tap(user => {
          this.user$.next(user);
        })
      );
  }
}
