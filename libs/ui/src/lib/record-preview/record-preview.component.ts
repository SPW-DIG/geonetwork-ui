import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { RecordSummary } from '@lib/common'
import { fromEvent, Subscription } from 'rxjs'

@Component({
  selector: 'ui-record-preview',
  template: '',
})
export class RecordPreviewComponent implements OnInit {
  @Input() record: RecordSummary
  @Input() linkTarget = '_blank'

  constructor(protected elementRef: ElementRef) {}

  ngOnInit(): void {}

  get isViewable() {
    return this.record.viewable
  }

  get isDownloadable() {
    return this.record.downloadable
  }
}
