import { Component, Input } from '@angular/core'
import { ColorService, RecordSummary } from '@lib/common'
import { select, Store } from '@ngrx/store'
import {
  getCurrentRecord,
  getHoverRecord,
  SearchState,
  SetCurrent,
} from '@lib/search'
import { HttpClient } from '@angular/common/http'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'search'

  record$ = this.store.pipe(select(getCurrentRecord))

  unsetRecord() {
    this.store.dispatch(new SetCurrent(null))
  }

  constructor(private store: Store<SearchState>) {
    ColorService.applyCssVariables('#e73f51', '#c2e9dc', '#212029', '#fdfbff')
  }
}
