import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { NzModalService } from 'ng-zorro-antd'
import { UserFormComponent } from './user-form/user-form.component'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private modalService: NzModalService) { }

  ngOnInit(): void {
  }

  delete() {

  }

  edit() {
    this.modalService.create({
      nzTitle: 'Cập nhật',
      nzContent: UserFormComponent
    })
  }

  addUser() {
    this.modalService.create({
      nzTitle: 'Thêm mới',
      nzContent: UserFormComponent
    })
  }
}
