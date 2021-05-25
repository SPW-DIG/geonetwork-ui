import { Component, OnInit } from '@angular/core'
import { BootstrapService, ColorService, RecordSummary } from '@lib/common'
import { SearchFacade } from '@lib/search'
import { map, pluck, take, tap } from 'rxjs/operators'
import { Title } from '@angular/platform-browser'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
})
export class MainSearchComponent implements OnInit {
  constructor(
    private bootstrap: BootstrapService,
    private searchFacade: SearchFacade,
    private colorService: ColorService,
    private titleService: Title
  ) {}

  record$: Observable<RecordSummary>

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

    this.record$ = this.searchFacade.current$
  }

  updateTheme() {
    ColorService.updateThemeColors()
  }

  setTheme(light: string) {
    this.colorService.setTheme(light)
  }
}
