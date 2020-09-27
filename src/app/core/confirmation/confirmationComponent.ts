import { Component, Input, EventEmitter, HostListener, ViewChild, ElementRef, TemplateRef } from '@angular/core'
import { Output } from '@angular/core'
import { NzModalRef, NzModalService } from 'ng-zorro-antd'

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[confirmation]',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})


export class ConfirmationComponent {
  @Input() confirmation: string
  @Input() confirmLabel: string
  @Input() size: 'small' | 'medium' | 'large' = 'medium'
  @Input() title: string
  @Input() set confirmationType(value: 'info' | 'warning' | 'danger') {
    this.type = value
  }
  @Input() time: number
  @Output() confirmed = new EventEmitter()
  @Output() dismissed = new EventEmitter()
  @ViewChild('template') template: TemplateRef<void>

  type: 'info' | 'warning' | 'danger' = 'danger'
  modalRef: NzModalRef

  constructor(
    private modalService: NzModalService
  ) { }

  hide() {
    this.modalRef.destroy()
    this.dismissed.emit()
  }

  confirm() {
    this.confirmed.emit()
    this.hide()
  }


  private getSizeClassName() {
    switch (this.size) {
      case 'small':
        return 'modal-sm'
      case 'large':
        return 'modal-lg'
      case 'medium':
      default:
        return 'modal-md'
    }
  }


  @HostListener('click')
  onclick() {
    const initialState = {
      title: this.title,
      text: this.confirmation,
    }
    this.modalRef = this.modalService.create({
      nzContent: this.template,
      nzComponentParams: initialState,
      nzClassName: this.getSizeClassName(),
      nzFooter: null
    })
    if (this.time > 0) {
      setTimeout(() => {
        this.hide()
      }, this.time * 1000)
    }
  }

}
