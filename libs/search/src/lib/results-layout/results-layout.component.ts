import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { UpdateResultsLayout } from '../state/actions'
import { SearchState } from '../state/reducer'
import { getSearchResultsLayout } from '../state/selectors'
import { ResultsListLayout } from '@lib/common'
import { FormControl } from '@angular/forms'
import { take } from 'rxjs/operators'

@Component({
  selector: 'search-results-layout',
  templateUrl: './results-layout.component.html',
})
export class ResultsLayoutComponent implements OnInit {
  private icons: Map<ResultsListLayout, string> = new Map([
    [ResultsListLayout.CARD, 'view_module'],
    [ResultsListLayout.TITLE, 'list'],
    [ResultsListLayout.LIST, 'view_list'],
  ])

  choices = new Map<ResultsListLayout, {}>()

  currentLayout

  currentLayout$ = this.store.pipe(select(getSearchResultsLayout))

  constructor(private store: Store<SearchState>) {}

  ngOnInit(): void {
    Object.values(ResultsListLayout).map((v) => {
      this.choices.set(v, {
        id: v,
        label: v,
        icon: this.icons.get(v) || '',
      })
    })

    this.currentLayout$.pipe(take(1)).subscribe((l) => {
      this.currentLayout =
        this.choices.get(l) || this.change(this.choices.keys().next())
    })
  }

  change(layout: any) {
    this.currentLayout = this.choices.get(layout.value)
    this.store.dispatch(new UpdateResultsLayout(layout.value))
  }
}
