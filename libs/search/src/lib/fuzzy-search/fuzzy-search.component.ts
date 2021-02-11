import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import { fromEvent, Subscription } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { SearchFacade } from '@lib/search'

@Component({
  selector: 'search-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuzzySearchComponent implements OnDestroy, AfterViewInit {
  @ViewChild('searchText') searchText: ElementRef

  currentTextSearch$

  subs = new Subscription()

  constructor(private searchFacade: SearchFacade) {
    this.currentTextSearch$ = this.searchFacade.searchFilters$
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.searchText.nativeElement.focus()
    }, 0)

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
          this.searchFacade.setFilters({
            any: value,
          })
        })
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
