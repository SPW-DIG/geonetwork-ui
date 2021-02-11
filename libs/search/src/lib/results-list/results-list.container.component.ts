import { Component, Input, OnInit } from '@angular/core'
import {
  InfiniteScrollModel,
  InfiniteScrollOptionsDefault,
  RecordSummary,
  ResultsListLayout,
} from '@lib/common'
import { SetCurrent, SetHover } from '../state/actions'
import { SearchFacade } from '../state/search.facade'
import { Observable } from 'rxjs'

@Component({
  selector: 'search-results-list-container',
  templateUrl: './results-list.container.component.html',
})
export class ResultsListContainerComponent implements OnInit {
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD
  @Input() scrollableOptions: InfiniteScrollModel = {}

  scrollableConfig: InfiniteScrollModel

  private resultsHits$: Observable<any>

  constructor(public facade: SearchFacade) {
    this.resultsHits$ = facade.resultsHits$
    facade.requestMoreResults()
  }

  ngOnInit(): void {
    this.scrollableConfig = {
      ...InfiniteScrollOptionsDefault,
      ...this.scrollableOptions,
    }
    this.facade.setResultsLayout(this.layout)
  }

  onScrollDown() {
    this.facade.scroll()
  }

  setCurrent(record: RecordSummary) {
    this.facade.setCurrent(record)
  }

  setHover(record: RecordSummary) {
    this.facade.setHover(record)
  }
}
