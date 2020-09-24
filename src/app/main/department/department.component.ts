import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { DepartmentFormComponent } from './department-form/department-form.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  switchValue = false
  constructor(
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
  }

  edit() {
    this.modalService.create({
      nzTitle: 'Cập nhật phòng ban',
      nzContent: DepartmentFormComponent
    })
  }
  delete() {

  }
  add() {
    this.modalService.create({
      nzTitle: 'Thêm mới phòng ban',
      nzContent: DepartmentFormComponent
    })
  }
}
