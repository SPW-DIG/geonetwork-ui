import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  ElementRef,
  OnDestroy,
  Output,
  ViewChild,
  OnInit,
} from '@angular/core'
import { fromEvent, Observable, Subscription } from 'rxjs'
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { SearchResponse } from 'elasticsearch'
import { SearchApiService } from '@lib/gn-api'
import { ElasticsearchMapper } from '@lib/search'
import { FormControl } from '@angular/forms'
import { BootstrapService } from '@lib/common'

@Component({
  selector: 'search-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuzzySearchComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() search = new EventEmitter<void>()

  @ViewChild('searchText') searchText: ElementRef
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger

  control = new FormControl()
  suggestions: Observable<string[]>
  autocompleteConfig
  currentTextSearch$

  subs = new Subscription()

  constructor(
    private bootstrap: BootstrapService,
    private searchService: SearchApiService,
    private esMapper: ElasticsearchMapper,
    private searchFacade: SearchFacade
  ) {
    this.currentTextSearch$ = this.searchFacade.searchFilters$
  }

  ngOnInit(): void {
    this.bootstrap
      .uiConfReady('srv')
      .pipe(
        take(1),
        map((config) => config.mods.search.autocompleteConfig),
        tap((autocompleteConfig) => {
          this.autocompleteConfig = autocompleteConfig
        })
      )
      .subscribe()

    this.suggestions = this.control.valueChanges.pipe(
      filter((value) => value.length > 2),
      debounceTime(300),
      switchMap((inputValue) => this.getSuggestions(inputValue))
    )
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.searchText.nativeElement.focus()
    }, 0)

    // this.subs.add(
    //   fromEvent(this.searchText.nativeElement, 'keyup')
    //     .pipe(
    //       map((e: KeyboardEvent) =>
    //         (e.target as HTMLInputElement).value.trim()
    //       ),
    //       debounceTime(400),
    //       distinctUntilChanged()
    //     )
    //     .subscribe((value) => {
    //       this.searchFacade.setFilters({
    //         any: value,
    //       })
    //     })
    // )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  triggerSearch(value: string) {
    this.searchFacade.setFilters({ any: value })
    this.autocomplete.closePanel()
    this.search.emit()
  }

  clear(): void {
    this.searchText.nativeElement.value = ''
    this.searchText.nativeElement.focus()
  }

  private getSuggestions(query: string): Observable<string[]> {
    this.autocompleteConfig.query.bool.must[0].multi_match.query = query
    return this.searchService
      .search('bucket', JSON.stringify(this.autocompleteConfig))
      .pipe(
        map((response: SearchResponse<any>) => {
          const records = this.esMapper.toRecordSummaries(
            response,
            this.searchService.configuration.basePath
          )
          return records.map((record) => record.title)
        })
      )
  }
}
