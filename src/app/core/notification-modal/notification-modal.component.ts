import { Component, OnInit, Input, EventEmitter } from '@angular/core'
import { NzModalRef } from 'ng-zorro-antd/modal'

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {
  @Input() title: string
  @Input() text: string
  @Input() closed$ = new EventEmitter()
  @Input() type: 'error' | 'success' | 'danger' | 'customIcon' = 'success'
  @Input() btnPrimary = 'Continue'
  @Input() image: string
  constructor(
    private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
  }

  hide() {
    this.modalRef.destroy()
    this.closed$.emit()
  }
}
