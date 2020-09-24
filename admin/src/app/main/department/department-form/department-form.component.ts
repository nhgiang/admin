import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {
  form: FormGroup
  isEdit: boolean
  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required, Validators.maxLength(150)],
      address: ['']
    })
  }

  destroyModal() {
    this.modalRef.destroy()
  }

  submit() {
    if (this.form.invalid) {
      return
    }
  }
}
