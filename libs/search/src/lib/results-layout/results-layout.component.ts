import { Component, OnInit } from '@angular/core'
import { ResultsListLayout } from '@lib/common'
import { take } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'

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

  constructor(public searchFacade: SearchFacade) {}

  ngOnInit(): void {
    Object.values(ResultsListLayout).map((v) => {
      this.choices.set(v, {
        id: v,
        label: v,
        icon: this.icons.get(v) || '',
      })
    })

    this.searchFacade.layout$.pipe(take(1)).subscribe((l) => {
      this.currentLayout =
        this.choices.get(ResultsListLayout[l]) ||
        this.change(this.choices.keys().next())
    })
  }

  change(layout: any) {
    this.currentLayout = this.choices.get(layout.value)
    this.searchFacade.setResultsLayout(layout.value)
  }
}
