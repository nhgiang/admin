import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DepartmentComponent } from './department/department.component'
import { MainComponent } from './main.component'
import { UserComponent } from './user/user.component'

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'user'
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'department',
        component: DepartmentComponent
      }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
