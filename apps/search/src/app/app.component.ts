import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { BootstrapService, ColorService } from '@lib/common'
import { select, Store } from '@ngrx/store'
import { getCurrentRecord, SearchFacade, SearchState } from '@lib/search'
import { map, pluck, take, tap } from 'rxjs/operators'
import { MatInput } from '@angular/material/input'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = ''

  record$ = this.store.pipe(select(getCurrentRecord))

  constructor(
    private bootstrap: BootstrapService,
    private store: Store<SearchState>,
    private searchFacade: SearchFacade,
    private titleService: Title
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
