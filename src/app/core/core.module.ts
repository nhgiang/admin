import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NotificationModalComponent } from './notification-modal/notification-modal.component'
import { ConfirmationComponent } from './confirmation/confirmationComponent'
import { NzModalModule } from 'ng-zorro-antd';
import { AgeNumberPipe } from './age-number.pipe'

const core = [
  NotificationModalComponent,
  ConfirmationComponent
]

@NgModule({
  declarations: [
    NotificationModalComponent,
    ConfirmationComponent,
    AgeNumberPipe
  ],
  imports: [
    CommonModule,
    NzModalModule
  ],
  exports: [
    core,
    AgeNumberPipe
  ]
})
export class CoreModule { }
