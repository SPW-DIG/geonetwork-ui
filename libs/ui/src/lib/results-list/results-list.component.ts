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

@Component({
  selector: 'ui-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListComponent implements OnInit {
  @Input() records: RecordSummary[]
  @Input() loading: boolean
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD

  @Output() currentRecordEvent = new EventEmitter<RecordSummary>()

  layoutEnum = ResultsListLayout

  constructor() {}

  ngOnInit() {}

  setCurrent(record: RecordSummary) {
    this.currentRecordEvent.emit(record)
  }
}
