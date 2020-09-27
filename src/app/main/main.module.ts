import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MainRoutingModule } from './main-routing.module'
import { MainComponent } from './main.component'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzButtonModule, NzDatePickerModule, NzIconModule, NzModalModule, NzSwitchModule, NzTableModule } from 'ng-zorro-antd'
import { DepartmentComponent } from './department/department.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UserComponent } from './user/user.component'
import { UserFormComponent } from './user/user-form/user-form.component';
import { DepartmentFormComponent } from './department/department-form/department-form.component'
import { CoreModule } from '../core/core.module'


@NgModule({
  declarations: [
    MainComponent,
    DepartmentComponent,
    UserComponent,
    UserFormComponent,
    DepartmentFormComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NzMenuModule,
    NzLayoutModule,
    NzIconModule,
    NzSwitchModule,
    FormsModule,
    NzTableModule,
    NzModalModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzButtonModule,
    CoreModule
  ]
})
export class MainModule { }
