import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import {
  InfiniteScrollModel,
  InfiniteScrollOptionsDefault,
  RecordSummary,
  ResultsListLayout,
} from '@lib/common'
import { iif, Observable, of } from 'rxjs'
import { distinctUntilChanged, mergeMap } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'

@Component({
  selector: 'search-results-list-container',
  templateUrl: './results-list.container.component.html',
})
export class ResultsListContainerComponent implements OnInit, OnDestroy {
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD
  @Input() scrollableOptions: InfiniteScrollModel = {}

  scrollDisable$: Observable<boolean>
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

    this.scrollDisable$ = of(this.scrollableConfig.disabled).pipe(
      mergeMap((disabled) =>
        iif(() => !!disabled, of(true), this.facade.isEndOfResults$)
      ),
      distinctUntilChanged()
    )
  }

  onScrollDown() {
    this.facade.scroll()
    this.scrollableConfig.disabled = true
  }

  setCurrent(record: RecordSummary) {
    this.facade.setCurrent(record)
  }

  setHover(record: RecordSummary) {
    this.facade.setHover(record)
  }

  ngOnDestroy(): void {}
}
