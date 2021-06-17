import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { AggregationsMatchPolicy, AggregationsTypesEnum } from '@lib/common'
import { fromEvent, Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import {
  FacetPath,
  FacetSelectEvent,
  ModelBlock,
  ModelItem,
} from '../facets.model'

@Component({
  selector: 'ui-facet-number',
  templateUrl: './facet-number.component.html',
  styleUrls: ['./facet-number.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetNumberComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  @Input() expanded = true
  @Input() isColumnMode = true
  @Input() filter: string
  @Input() icons: any = {}
  @Input() model: ModelBlock
  @Input() selectedPaths: FacetPath[]

  @ViewChild('filterInput') eltFilterInputRef: ElementRef<HTMLInputElement>

  @Output() filterChange = new EventEmitter<string>()
  @Output() itemChange = new EventEmitter<FacetSelectEvent>()
  @Output() more = new EventEmitter<void>()

  title: string
  hasItems: boolean
  hasIcons: boolean

  selectedItems: ModelItem[]
  private subscription = new Subscription()

  constructor() {}

  ngOnInit(): void {
    this.hasItems = this.countItems() > 0
    this.hasIcons = this.icons && Object.keys(this.icons).length > 0
    this.title = this.model.key
    this.selectedItems = []
  }

  ngAfterViewInit(): void {
    if (this.eltFilterInputRef) {
      this.subscription.add(
        fromEvent<Event>(this.eltFilterInputRef.nativeElement, 'keyup')
          .pipe(debounceTime(300))
          .subscribe((event: any) =>
            this.onFilterChange((event.path[0] as HTMLInputElement).value)
          )
      )
    }
  }

  get canFilter(): boolean {
    return this.model.includeFilter
  }

  countItems() {
    return this.model.type === AggregationsTypesEnum.FILTERS
      ? this.model.items.reduce((sum, current) => sum + current.count, 0)
      : this.model.items.length
  }

  onFilterChange(value: string) {
    this.filterChange.emit(value)
  }

  isItemSelected(item: ModelItem) {
    const selected = this.selectedPaths
      .map((path) => JSON.stringify(path))
      .includes(JSON.stringify(item.path))
    if (selected) {
      this.selectedItems.push(item)
    }
    return selected
  }

  emitItemChange(item: ModelItem): void {
    const eventOutput: FacetSelectEvent = { item, block: this.model }
    if (this.model.matchPolicy === AggregationsMatchPolicy.MATCH_ONE) {
      eventOutput.removedItem = this.selectedItems[0]
      this.selectedItems[0] = item
    }
    this.itemChange.emit(eventOutput)
  }

  onItemSelectedChange(selected: boolean, item: ModelItem) {
    item.selected = selected
    this.emitItemChange(item)
  }

  onItemInvertedChange(inverted: boolean, item: ModelItem) {
    item.inverted = inverted
    this.emitItemChange(item)
  }

  onMoreClick(event: Event) {
    event.preventDefault()
    this.more.emit()
  }

  getItems() {
    return this.model.items
  }

  canShowMore() {
    return this.model.more
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    const model = changes.model
    if (model) {
      this.hasItems = this.countItems() > 0
    }
  }
}

@Component({ selector: 'ui-facet-block', template: '' })
export class FacetBlockStubComponent implements Partial<FacetNumberComponent> {
  @Input() title: string
  @Input() model: ModelBlock
  @Input() selectedPaths: string[][]

  @Output() filterChange = new EventEmitter<string>()
  @Output() itemSelected = new EventEmitter<string[]>()
  @Output() itemUnselected = new EventEmitter<string[]>()
}
