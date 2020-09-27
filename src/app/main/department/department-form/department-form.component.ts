import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NzModalRef } from 'ng-zorro-antd'
import { tap } from 'rxjs/operators'
import { DepartmentApi } from 'src/app/api/department.api'
import { AlertService } from 'src/app/services/alert.service'
import { Department } from 'src/types/model'
import { Activity } from 'src/utils/activity'

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {
  form: FormGroup
  department: Department
  keyword: string
  activity = new Activity()
  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private departmentApi: DepartmentApi,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]]
    })
    if (this.department) {
      this.form.patchValue(this.department)
    }
  }

  destroyModal() {
    this.modalRef.destroy()
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.activity.start('submitting')
    let body = this.form.value
    if (this.department) {
      body = Object.assign({}, body, { id: this.department.id, status: this.department.status })
      this.departmentApi.updateDepartment(body).pipe(tap(() => {
      })).subscribe(() => {
        this.alert.success('Cập nhật phòng ban thành công')
        this.activity.stop('submitting')
        this.destroyModal()
      }, () => {
        this.alert.error('Cập nhât phòng ban thất bại')
        this.activity.stop('submitting')
      })
    } else {
      this.departmentApi.createDepartment(body).subscribe(() => {
        this.alert.success('Cập nhật phòng ban thành công')
        this.activity.stop('submitting')
        this.destroyModal()
      }, () => {
        this.alert.error('Cập nhât phòng ban thất bại')
        this.activity.stop('submitting')
      })
    }
  }

  search() {
    this.departmentApi.getDepartments(this.keyword).subscribe()
  }
}
