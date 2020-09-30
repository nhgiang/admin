import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from 'src/types/model'
import { BaseApi } from './base-api.class'
import { baseUrl } from './base-url'

@Injectable({
  providedIn: 'root'
})
export class UserApi extends BaseApi {
  constructor(
    httpClient: HttpClient,
    @Inject(baseUrl) protected hostUrl: string,
  ) {
    super(httpClient)
    this.setEndpoint(hostUrl, 'api/v1/user')
  }

  getUsers(keyword: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.createUrl(`get-users?keyword=${keyword}`))
  }

  createUser(body, departmentId: string) {
    return this.httpClient.post(this.createUrl(`create?departmentId=${departmentId}`), body, { responseType: 'text' })
  }

  getUser(userId): Observable<User> {
    return this.httpClient.get<User>(this.createUrl(`get-user?id=${userId}`))
  }

  updateUser(body, departmentId: string) {
    return this.httpClient.put(this.createUrl(`update?departmentId=${departmentId}`), body, { responseType: 'text' })
  }

  deleteUser(id) {
    return this.httpClient.delete(this.createUrl(`delete-user?id=${id}`), { responseType: 'text' })
  }
}
