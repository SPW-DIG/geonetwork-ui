import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core'

import { FacetSelectEvent, ModelBlock } from '../facets.model'
import { EsRequestAggTerm, FacetLayout, ResultsListLayout } from '@lib/common'

@Component({
  selector: 'ui-facet-list',
  templateUrl: './facet-list.component.html',
  styleUrls: ['./facet-list.component.css'],
})
export class FacetListComponent implements OnInit {
  @Input() field: string
  @Input() icons: any
  @Input() models: ModelBlock[]
  @Input() selectedPaths: string[][]
  @Input() layout: FacetLayout = FacetLayout.CHECKBOX

  @Output() itemChange = new EventEmitter<FacetSelectEvent>()

  @Output() more = new EventEmitter<string>()
  @Output() filterChange = new EventEmitter<EsRequestAggTerm>()

  layoutEnum = FacetLayout

  iconsConfig = {}

  constructor() {}

  ngOnInit(): void {
    if (this.icons && this.icons !== '') {
      try {
        this.iconsConfig = JSON.parse(this.icons)
      } catch (e) {
        console.error('Invalid JSON icon configuration.')
      }
    }
  }

  getBlockSelectedPaths(model: ModelBlock) {
    return this.selectedPaths.filter((path) => {
      const sPath = JSON.stringify(path)
      const sModelPath = JSON.stringify(model.path)
      const startModelPath = sModelPath.substring(0, sModelPath.length - 1)
      return sPath.startsWith(startModelPath)
    })
  }

  trackByIndexKey(index: number, model: ModelBlock) {
    return model.key
  }

  onItemChange(facetEvent: FacetSelectEvent) {
    this.itemChange.emit(facetEvent)
  }

  onMore(key: string): void {
    this.more.emit(key)
  }

  onFilterChange(field: string, include: string): void {
    this.filterChange.emit({ field, include })
  }
}
