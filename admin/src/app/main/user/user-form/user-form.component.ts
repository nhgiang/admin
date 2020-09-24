import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NzModalRef } from 'ng-zorro-antd'
import { Activity } from 'src/utils/activity'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form: FormGroup
  isEdit: boolean
  activity = new Activity()
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      gender: ['', Validators.required],
      address: [''],
      birthday: ['9/4/2020'],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }

  destroyModal() {
    this.modal.destroy()
  }

  isValid(control: FormControl): boolean {
    return
  }

  submit() {
    if (this.form.invalid) {
      return
    }
  }

  onChange(e) {

  }
} 
