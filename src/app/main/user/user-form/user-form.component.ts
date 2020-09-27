import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NzModalRef } from 'ng-zorro-antd'
import { tap } from 'rxjs/operators'
import { DepartmentApi } from 'src/app/api/department.api'
import { UserApi } from 'src/app/api/user.api'
import { AlertService } from 'src/app/services/alert.service'
import { Department, User } from 'src/types/model'
import { Activity } from 'src/utils/activity'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form: FormGroup
  activity = new Activity()
  user: User
  departments: Department[]
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private userApi: UserApi,
    private alert: AlertService,
    private departmentApi: DepartmentApi
  ) { }

  ngOnInit(): void {
    this.getDepartments()
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      gender: ['', Validators.required],
      birthDay: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      phone: [''],
      department: ['']
    })
    if (this.user) {
      this.form.patchValue(this.user)
    }
  }

  destroyModal() {
    this.modal.destroy()
  }

  isValid(control: string): boolean {
    return this.form.get(control).invalid && (this.form.get(control).touched || this.form.get(control).dirty)
  }

  submit() {
    (Object as any).values(this.form.controls).forEach(control => {
      control.markAsTouched()
    })
    if (this.form.invalid) {
      return
    }
    let body = this.form.value
    this.activity.start('submitting')
    if (this.user) {
      body = Object.assign({}, body, { id: this.user.id, status: this.user.status })
      this.userApi.updateUser(body).pipe(tap(() => {
      })).subscribe(() => {
        this.alert.success('Cập nhật người dùng thành công')
        this.activity.stop('submitting')
        this.destroyModal()
      }, () => {
        this.alert.error('Cập nhật người dùng thất bại')
        this.activity.stop('submitting')
      })
    } else {
      this.userApi.createUser(body).subscribe(() => {
        this.alert.success('Thêm mới người dùng thành công')
        this.activity.stop('submitting')
        this.destroyModal()
      }, () => {
        this.activity.stop('submitting')
        this.alert.error('Thêm mới người dùng thất bại')
      })
    }
  }

  getDepartments() {
    this.departmentApi.getDepartments('').subscribe(department => {
      this.departments = department
    })
  }
}
