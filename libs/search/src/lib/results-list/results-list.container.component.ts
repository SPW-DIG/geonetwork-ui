import { Component, Input, OnInit } from '@angular/core'
import { BootstrapService, RecordSummary, ResultsListLayout } from '@lib/common'
import { select, Store } from '@ngrx/store'
import { SetCurrent, SetHover, SetResultsLayout } from '../state/actions'
import { SearchState } from '../state/reducer'
import {
  getSearchResults,
  getSearchResultsLayout,
  getSearchResultsLoading,
} from '../state/selectors'

@Component({
  selector: 'search-results-list-container',
  templateUrl: './results-list.container.component.html',
})
export class ResultsListContainerComponent implements OnInit {
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD

  results$ = this.store.pipe(select(getSearchResults))
  layout$ = this.store.pipe(select(getSearchResultsLayout))
  isLoading$ = this.store.pipe(select(getSearchResultsLoading))

  constructor(private store: Store<SearchState>) {}

  ngOnInit(): void {
    this.store.dispatch(new SetResultsLayout(this.layout))
  }

  setCurrent(record: RecordSummary) {
    this.store.dispatch(new SetCurrent(record))
  }
  setHover(record: RecordSummary) {
    this.store.dispatch(new SetHover(record))
  }
}
