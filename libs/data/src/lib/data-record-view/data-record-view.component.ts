import { Component, Input, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { getCurrentRecord, SearchState, SetCurrent } from '@lib/search'
import { animate, style, transition, trigger } from '@angular/animations'
import { Title } from '@angular/platform-browser'
import { filter, take } from 'rxjs/operators'

@Component({
  selector: 'data-record-view',
  templateUrl: './data-record-view.component.html',
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class DataRecordViewComponent implements OnInit {
  @Input() uuid: string

  record$ = this.store.pipe(select(getCurrentRecord))
  previousTitle: string

  unsetRecord() {
    this.store.dispatch(new SetCurrent(null))
    this.titleService.setTitle(this.previousTitle)
  }

  constructor(private store: Store<SearchState>, private titleService: Title) {}

  ngOnInit(): void {
    this.record$
      .pipe(
        take(1),
        filter((r) => r !== null)
      )
      .subscribe((r) => {
        this.previousTitle = this.titleService.getTitle()
        this.titleService.setTitle(r.title)
      })
  }
}
