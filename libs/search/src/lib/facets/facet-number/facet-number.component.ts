import { Component, Input } from '@angular/core'
import { Observable } from 'rxjs'
import { ModelBlock } from '@lib/ui'
import { FacetsContainerComponent } from '../facets-container/facets-container.component'
import { AggregationsMatchPolicy, FacetLayout } from '@lib/common'
import { FacetsService } from '../facets.service'
import { SearchFacade } from '@lib/search'

@Component({
  selector: 'search-facet-number',
  templateUrl: './facet-number.component.html',
})
export class FacetNumberComponent extends FacetsContainerComponent {
  @Input() title
  @Input() icons
  layout = FacetLayout.NUMBER
  models$: Observable<ModelBlock[]>

  constructor(facets: FacetsService, searchFacade: SearchFacade) {
    super(facets, searchFacade)
    this.matchPolicy = AggregationsMatchPolicy.MATCH_ONE
  }
}
