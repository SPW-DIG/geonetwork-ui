import { Component, OnInit } from '@angular/core'
import { BootstrapService } from '@lib/common'
import { SearchFacade } from '@lib/search'
import { map, pluck, take, tap } from 'rxjs/operators'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
})
export class MainSearchComponent implements OnInit {
  constructor(
    private bootstrap: BootstrapService,
    private searchFacade: SearchFacade,
    private titleService: Title
  ) {}

  record$ = this.searchFacade.current$

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

    this.bootstrap
      .siteInfoReady()
      .pipe(
        pluck('system/site/name'),
        map((title: string) => {
          this.titleService.setTitle(title)
        })
      )
      .subscribe()
  }
}
