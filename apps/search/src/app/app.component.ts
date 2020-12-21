import { Component } from '@angular/core'
import { ColorService } from '@lib/common'
import { select, Store } from '@ngrx/store'
import { getCurrentRecord, SearchState } from '@lib/search'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'search'

  record$ = this.store.pipe(select(getCurrentRecord))

  constructor(private store: Store<SearchState>) {
    ColorService.applyCssVariables('#e73f51', '#c2e9dc', '#212029', '#fdfbff')
  }
}
