import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import { select, Store } from '@ngrx/store'
import { fromEvent, Subscription } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { UpdateFilters } from '../state/actions'
import { SearchState } from '../state/reducer'
import { getSearchFilters } from '../state/selectors'

@Component({
  selector: 'search-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuzzySearchComponent implements OnDestroy, AfterViewInit {
  @ViewChild('searchText') searchText: ElementRef

  currentTextSearch$ = this.store.pipe(
    select(getSearchFilters),
    map((filters) => filters.any || '')
  )

  options = ['CDDA', 'Corine']
  subs = new Subscription()

  constructor(private store: Store<SearchState>) {}

  ngAfterViewInit(): void {
    this.subs.add(
      fromEvent(this.searchText.nativeElement, 'keyup')
        .pipe(
          map((e: KeyboardEvent) =>
            (e.target as HTMLInputElement).value.trim()
          ),
          debounceTime(400),
          distinctUntilChanged()
        )
        .subscribe((value) => {
          this.store.dispatch(
            new UpdateFilters({
              any: value,
            })
          )
        })
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
