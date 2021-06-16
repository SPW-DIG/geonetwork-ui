import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ModelBlock } from '@lib/ui'
import { FacetsContainerComponent } from '../facets-container/facets-container.component'
import { AggregationsMatchPolicy, FacetLayout } from '@lib/common'
import { FacetsService } from '../facets.service'
import { SearchFacade } from '@lib/search'

class FacetIconConfig {
  background: boolean
  items: any[]
}

@Component({
  selector: 'search-facet-number',
  templateUrl: './facet-number.component.html',
})
export class FacetNumberComponent
  extends FacetsContainerComponent
  implements OnInit
{
  @Input() title
  @Input() isColumnMode = false
  @Input() icons: FacetIconConfig
  layout = FacetLayout.NUMBER
  models$: Observable<ModelBlock[]>

  constructor(facets: FacetsService, searchFacade: SearchFacade) {
    super(facets, searchFacade)
    this.matchPolicy = AggregationsMatchPolicy.MATCH_ONE
  }

  ngOnInit(): void {
    console.log('NUMBER_IN_COLUMN')
    this.layout = this.isColumnMode
      ? FacetLayout.NUMBER_IN_COLUMN
      : FacetLayout.NUMBER
    super.ngOnInit()
  }
}
