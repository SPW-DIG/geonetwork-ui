import { Component, OnInit } from '@angular/core'
import { BootstrapService, ColorService } from '@lib/common'
import { select } from '@ngrx/store'
import { getCurrentRecord, SearchFacade } from '@lib/search'
import { map, take, tap } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'search'

  record$ = this.store.pipe(select(getCurrentRecord))

  constructor(
    private bootstrap: BootstrapService,
    private searchFacade: SearchFacade
  ) {
    ColorService.applyCssVariables('#e73f51', '#c2e9dc', '#212029', '#fdfbff')
  }

  ngOnInit(): void {
    this.bootstrap
      .uiConfReady('srv')
      .pipe(
        take(1),
        map((config) => config.mods.search.facetConfig),
        tap((aggregationsConfig) => {
          this.searchFacade.setConfigAggregations(aggregationsConfig)
          this.searchFacade.requestMoreResults()
        })
      )
      .subscribe()
  }
}
