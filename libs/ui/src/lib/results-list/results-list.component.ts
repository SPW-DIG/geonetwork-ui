import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { RecordSummary, ResultsListLayout } from '@lib/common'
import { Subject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { animate, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'ui-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ResultsListComponent implements OnInit {
  @Input() records: RecordSummary[]
  @Input() loading: boolean
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD

  @Output() currentRecordEvent = new EventEmitter<RecordSummary>()
  @Output() hoverRecordEvent = new EventEmitter<RecordSummary>()

  layoutEnum = ResultsListLayout

  constructor() {}

  ngOnInit() {}

  setCurrent(record: RecordSummary) {
    this.currentRecordEvent.emit(record)
  }

  setHover(record: RecordSummary) {
    this.hoverRecordEvent.emit(record)
  }
}
