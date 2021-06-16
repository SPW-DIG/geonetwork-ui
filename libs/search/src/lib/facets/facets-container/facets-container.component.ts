import { Component, Input, OnInit } from '@angular/core'
import {
  AggregationsMatchPolicy,
  EsRequestAggTerm,
  SearchFilters,
} from '@lib/common'
import { FacetSelectEvent, ModelBlock } from '@lib/ui'
import { combineLatest, Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { SearchFacade } from '../../state/search.facade'
import { FacetsService } from '../facets.service'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('facets.block.title.OrgForResource')
marker('facets.block.title.availableInServices')
marker('facets.block.title.cl_hierarchyLevel.key')
marker('facets.block.title.cl_maintenanceAndUpdateFrequency.key')
marker('facets.block.title.cl_spatialRepresentationType.key')
marker('facets.block.title.cl_status.key')
marker('facets.block.title.creationYearForResource')
marker('facets.block.title.resolutionScaleDenominator')
marker('facets.block.title.tag')
marker('facets.block.title.tag.default')
marker('facets.block.title.th_regions_tree.default')

@Component({
  selector: 'search-facets-container',
  templateUrl: './facets-container.component.html',
  styleUrls: ['./facets-container.component.css'],
})
export class FacetsContainerComponent implements OnInit {
  @Input() field

  selectedPaths$: Observable<string[][]>
  models$: Observable<ModelBlock[]>
  matchPolicy: AggregationsMatchPolicy = AggregationsMatchPolicy.MATCH_ALL
  onFirstRunModel: ModelBlock[]

  constructor(
    private facets: FacetsService,
    private searchFacade: SearchFacade
  ) {}

  ngOnInit(): void {
    this.selectedPaths$ = this.searchFacade.searchFilters$.pipe(
      map((filters) => this.facets.findSelectedPaths(filters))
    )

    this.models$ = combineLatest([
      this.searchFacade.configAggregations$,
      this.searchFacade.resultsAggregations$,
    ]).pipe(
      map(([configAggregations, resultsAggregations]) => {
        const model = this.facets.createFacetModel(
          configAggregations,
          resultsAggregations,
          false,
          undefined,
          this.matchPolicy
        )
        if (
          this.matchPolicy === AggregationsMatchPolicy.MATCH_ANY ||
          this.matchPolicy === AggregationsMatchPolicy.MATCH_ONE
        ) {
          if (!this.onFirstRunModel && model && model.length > 0) {
            this.onFirstRunModel = model
          }
          return this.onFirstRunModel
        }
        return model
      })
    )
  }

  onItemChange(facetEvent: FacetSelectEvent) {
    this.searchFacade.searchFilters$.pipe(take(1)).subscribe((filters) => {
      this.updateFilters(filters, facetEvent)
    })
  }

  private updateFilters(filters: SearchFilters, facetEvent: FacetSelectEvent) {
    const { item, removedItem, block } = facetEvent
    const { path } = item
    const pathValue = this.facets.computeItemPathValue(block, item)
    const removedPathValue =
      removedItem && this.facets.computeItemPathValue(block, removedItem)

    let newFilters
    if (removedPathValue) {
      newFilters = this.facets.computeNewFiltersFromState(
        filters,
        removedItem.path,
        null
      )
    }

    newFilters = this.facets.computeNewFiltersFromState(
      newFilters || filters,
      path,
      pathValue
    )
    this.searchFacade.setFilters(newFilters)
  }

  onMore(key: string): void {
    this.searchFacade.requestMoreOnAggregation(key, 20)
  }

  onFilterChange(term: EsRequestAggTerm): void {
    const include = `.*${term.include}.*`
    this.searchFacade.setIncludeOnAggregation(term.field, include)
  }
}
