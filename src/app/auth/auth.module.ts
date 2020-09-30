import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { NzButtonModule, NzFormModule, NzIconModule, NzInputModule, NzLayoutModule } from 'ng-zorro-antd'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './login/login.component'


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    FormsModule,
    NzIconModule,
    NzLayoutModule,
    NzButtonModule
  ]
})
export class AuthModule { }
