import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Department, User } from 'src/types/model'
import { BaseApi } from './base-api.class'
import { baseUrl } from './base-url'

@Injectable({
  providedIn: 'root'
})
export class DepartmentApi extends BaseApi {
  constructor(
    httpClient: HttpClient,
    @Inject(baseUrl) protected hostUrl: string,
  ) {
    super(httpClient)
    this.setEndpoint(hostUrl, 'api/v1/department')
  }

  getDepartments(keyword: string): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.createUrl(`get-departments?keyword=${keyword}`))
  }

  createDepartment(body) {
    return this.httpClient.post(this.createUrl('create'), body, { responseType: 'text' })
  }

  getDepartment(id): Observable<Department> {
    return this.httpClient.get<Department>(this.createUrl(`get-department?id=${id}`))
  }

  updateDepartment(body) {
    return this.httpClient.put(this.createUrl('update'), body, { responseType: 'text' })
  }

  deleteDepartment(id) {
    return this.httpClient.delete(this.createUrl(`delete-department?id=${id}`), { responseType: 'text' })
  }
}
