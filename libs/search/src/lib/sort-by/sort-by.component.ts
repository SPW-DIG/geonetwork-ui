import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { SortBy } from '../state/actions'
import { SearchState } from '../state/reducer'
import { getSearchSortBy } from '../state/selectors'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('last changed')
marker('popularity')

@Component({
  selector: 'search-sort-by',
  templateUrl: './sort-by.component.html',
})
export class SortByComponent implements OnInit {
  choices = [
    {
      label: 'last changed',
      value: 'dateStamp',
      icon: 'update',
    },
    {
      label: 'popularity',
      value: 'popularity',
      icon: 'stars',
    },
  ]
  currentSortBy$ = this.store.pipe(select(getSearchSortBy))

  constructor(private store: Store<SearchState>) {}

  ngOnInit(): void {}

  changeSortBy(criteria: any) {
    if (typeof criteria === 'string') {
      this.store.dispatch(new SortBy(criteria))
    } else {
      throw new Error(`Unexpected value received: ${criteria}`)
    }
  }
}
