import { Component, OnInit } from '@angular/core'
import { NzModalService } from 'ng-zorro-antd'
import { switchMap } from 'rxjs/operators'
import { DepartmentApi } from 'src/app/api/department.api'
import { AlertService } from 'src/app/services/alert.service'
import { Department } from 'src/types/model'
import { DepartmentFormComponent } from './department-form/department-form.component'

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  switchValue = false
  departments: Department[]
  keyword: string
  allDepartment: Department[]
  constructor(
    private modalService: NzModalService,
    private departmentApi: DepartmentApi,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.fetch()
  }

  edit(id) {
    this.departmentApi.getDepartment(id).subscribe(department => {
      this.modalService.create({
        nzTitle: 'Cập nhật phòng ban',
        nzContent: DepartmentFormComponent,
        nzComponentParams: {
          department
        }
      }).afterClose.subscribe(() => {
        this.fetch()
      })
    })
  }

  delete(id) {
    this.departmentApi.deleteDepartment(id).pipe(switchMap(() => {
      return this.departmentApi.getDepartments('')
    })).subscribe(departments => {
      this.departments = departments
      this.alert.success('Xóa phòng ban thành công')
    }, () => {
      this.alert.error('Xóa phòng ban thất bại')
    })
  }

  add() {
    this.modalService.create({
      nzTitle: 'Thêm mới phòng ban',
      nzContent: DepartmentFormComponent
    }).afterClose.subscribe(() => {
      this.fetch()
    })
  }

  fetch() {
    this.departmentApi.getDepartments('').subscribe(departments => {
      this.allDepartment = departments
      this.departments = departments
    })
  }

  updateStatus(event, department) {
    const body: Department = Object.assign({}, department, { status: event ? 'active' : 'inactive' })
    this.departmentApi.updateDepartment(body).subscribe(() => {
      this.alert.success('Cập nhật trạng thái phòng ban thành công')
    }, () => {
      this.alert.error('Cập nhật trạng thái phòng ban thất bại')
    })
  }

  search() {
    if (!this.keyword) {
      this.departments = this.allDepartment
      return
    }
    this.departments = this.allDepartment.filter(u => {
      if (u.name.toLowerCase().includes(this.keyword)) {
        return u
      }
    })
  }
}
