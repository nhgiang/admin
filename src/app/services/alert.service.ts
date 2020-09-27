import { Injectable } from '@angular/core'
import { NzModalService } from 'ng-zorro-antd'
import { Ng2IzitoastService } from 'ng2-izitoast'
import { NotificationModalComponent } from '../core/notification-modal/notification-modal.component'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private izitToast: Ng2IzitoastService,
    private modalService: NzModalService
  ) { }

  error(msg: string) {
    this.izitToast.error({
      title: 'Error!',
      message: msg,
      position: 'topCenter',
      icon: 'fas fa-exclamation-circle',
      iconColor: '#ffffff',
      backgroundColor: '#dd2424',
      messageColor: '#ffffff',
      theme: 'dark',
      transitionIn: 'fadeIn'
    })
  }

  success(msg: string) {
    this.izitToast.success({
      title: 'Success!',
      message: msg,
      position: 'topCenter',
      icon: 'fas fa-check-circle',
      iconColor: 'white',
      backgroundColor: '#0fac53',
      messageColor: '#ffffff',
      theme: 'dark',
      transitionIn: 'fadeIn'
    })
  }

  // tslint:disable-next-line: ban-types
  successModal(msg: string, callback?: Function) {
    const initialState = {
      title: 'Success',
      text: msg,
    }
    const modalRef = this.modalService.create({
      nzContent: NotificationModalComponent,
      nzComponentParams: initialState
    })
    modalRef.componentInstance.closed$.subscribe(() => {
      callback()
    })
  }

  // tslint:disable-next-line: ban-types
  errorModal(msg: string, callback?: Function) {
    const modalRef = this.modalService.create({
      nzContent: NotificationModalComponent,
      nzComponentParams: { type: 'error', text: msg, title: 'error' },
    })
    modalRef.componentInstance.closed$.subscribe(() => {
      callback()
    })
  }
}
