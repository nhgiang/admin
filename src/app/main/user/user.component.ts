import { Component, OnInit, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { NzModalService } from 'ng-zorro-antd'
import { Observable } from 'rxjs'
import { filter, switchMap, tap } from 'rxjs/operators'
import { DepartmentApi } from 'src/app/api/department.api'
import { UserApi } from 'src/app/api/user.api'
import { ConfirmationComponent } from 'src/app/core/confirmation/confirmationComponent'
import { AlertService } from 'src/app/services/alert.service'
import { Department, User } from 'src/types/model'
import { UserFormComponent } from './user-form/user-form.component'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild('modalConfirm') modalConfirm: ConfirmationComponent
  allUser: User[]
  users: User[]
  keyword: string
  department: Department[]

  constructor(
    private modalService: NzModalService,
    private userApi: UserApi,
    private alert: AlertService,
    private departmentApi: DepartmentApi
  ) { }

  ngOnInit(): void {
    this.fetch()
  }

  fetch() {
    this.userApi.getUsers('').pipe(tap(users => {
      this.allUser = users
      this.users = users
    }), switchMap(() => {
      return this.departmentApi.getDepartments('')
    })).subscribe(department => {
      this.department = department
    })
  }

  edit(userId) {
    this.userApi.getUser(userId).subscribe(user => {
      const modelRef = this.modalService.create({
        nzTitle: 'Cập nhật',
        nzContent: UserFormComponent,
        nzComponentParams: {
          user
        }
      })
      modelRef.afterClose.subscribe(() => {
        this.fetch()
      })
    })
  }

  addUser() {
    this.modalService.create({
      nzTitle: 'Thêm mới',
      nzContent: UserFormComponent,
    }).afterClose.subscribe(() => {
      this.fetch()
    })
  }

  updateStatus(event, user) {
    const body: User = Object.assign({}, user, { status: event ? 'active' : 'inactive' })
    this.userApi.updateUser(body, user.department).subscribe(() => {
      this.alert.success('Cập nhật trạng thái người dùng thành công')
      this.fetch()
    }, () => {
      this.alert.error('Cập nhật trạng thái người dùng thất bại')
    })
  }

  delete(userId) {
    this.userApi.deleteUser(userId).pipe(switchMap(() => {
      return this.userApi.getUsers('')
    })).subscribe(users => {
      this.users = users
      this.alert.success('Xóa người dùng thành công')
    }, () => {
      this.alert.error('Xóa người dùng thất bại')
    })
  }

  search() {
    if (!this.keyword) {
      this.users = this.allUser
      return
    }
    this.users = this.allUser.filter(u => {
      const name = u.firstName + u.lastName
      if (name.toLowerCase().includes(this.keyword)) {
        return u
      }
    })
  }

  onchange() {
    this.modalConfirm.onclick()
  }

  departmentById(id) {
    const department = this.department && this.department.find(d => d.id === id)
    return department && department.name
  }

  userByDepartment(event) {
    if (!event) {
      this.users = this.allUser
      return
    }
    this.users = this.allUser.filter(u => u.status === event)
  }
}
