import { DebugElement } from '@angular/core'
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'

import { FacetItemStubComponent } from '../facet-item/facet-item.component'
import { BLOCK_MODEL_FIXTURE, EMPTY_BLOCK_MODEL_FIXTURE } from '../fixtures'
import { FacetBlockComponent } from './facet-block.component'

describe('FacetBlockComponent', () => {
  let component: FacetBlockComponent
  let fixture: ComponentFixture<FacetBlockComponent>
  let de: DebugElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacetBlockComponent, FacetItemStubComponent],
      imports: [FormsModule, TranslateModule.forRoot()],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetBlockComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    component.model = BLOCK_MODEL_FIXTURE
    component.selectedPaths = []
    fixture.detectChanges()
  })

  it('should create with default state and model fixture', () => {
    expect(component).toBeTruthy()
    // Default state
    expect(de.query(By.css('.icon-collapse'))).toBeTruthy()
    expect(de.query(By.css('.icon-expand'))).toBeFalsy()
    expect(de.query(By.css('.collapsible-content'))).toBeTruthy()
    expect(de.query(By.css('.input-filter'))).toBeTruthy()
    // Mock fixture
    expect(de.query(By.css('div > span'))).toBeTruthy()
    expect(de.query(By.css('.span-title')).nativeElement.textContent).toBe(
      'facets.block.title.tag'
    )
    expect(de.queryAll(By.css('ui-facet-item')).length).toEqual(21)
    expect(de.query(By.css('.a-more'))).toBeTruthy()
  })

  describe('Input collapsed', () => {
    beforeEach(() => {
      component.collapsed = true
      fixture.detectChanges()
    })
    it('removes the collapsible content', () => {
      expect(de.query(By.css('.icon-collapse'))).toBeFalsy()
      expect(de.query(By.css('.icon-expand'))).toBeTruthy()
      expect(de.query(By.css('.collapsible-content')).properties.hidden).toBe(
        true
      )
    })
  })

  describe('Toggle collapsed', () => {
    let icon: DebugElement
    beforeEach(() => {
      component.collapsed = true
      fixture.detectChanges()
      icon = de.query(By.css('.icon-expand'))
    })
    it('adds the collapsible content', () => {
      icon.nativeElement.click()
      fixture.detectChanges()
      expect(de.query(By.css('.icon-collapse'))).toBeTruthy()
      expect(de.query(By.css('.icon-expand'))).toBeFalsy()
      expect(de.query(By.css('.collapsible-content'))).toBeTruthy()
    })
  })

  describe('Input filter', () => {
    describe('when include filter', () => {
      beforeEach(() => {
        fixture.detectChanges()
      })
      it('adds the filter input with a value', () => {
        const input = de.query(By.css('.input-filter'))
        expect(input).toBeTruthy()
      })
    })
    describe('when no include filter', () => {
      beforeEach(() => {
        component.model = EMPTY_BLOCK_MODEL_FIXTURE
        fixture.detectChanges()
      })
      it('adds the filter input with a value', () => {
        const input = de.query(By.css('.input-filter'))
        expect(input).toBeFalsy()
      })
    })
  })

  describe('Output filterChange', () => {
    let input: DebugElement
    beforeEach(() => {
      input = de.query(By.css('.input-filter'))
    })
    it('outputs the changed filter value', fakeAsync(() => {
      spyOn(component.filterChange, 'emit')
      input.nativeElement.value = 'europe'
      const event = new Event('keyup') as any
      event.path = [input.nativeElement]
      input.nativeElement.dispatchEvent(event)
      tick(300)
      fixture.detectChanges()
      expect(component.filterChange.emit).toHaveBeenCalledWith('europe')
    }))
  })

  describe('Input selectedPaths', () => {
    let items: DebugElement[]
    beforeEach(() => {
      component.selectedPaths = [
        [BLOCK_MODEL_FIXTURE.key, 'Romania'],
        [BLOCK_MODEL_FIXTURE.key, 'Austria'],
      ]
      fixture.detectChanges()
      items = de.queryAll(By.directive(FacetItemStubComponent))
    })
    it('selects only the items matching the selected facets', () => {
      const selectedItems = items.filter((item) => {
        const stub = item.componentInstance as FacetItemStubComponent
        return stub.selected === true
      })
      expect(selectedItems.length).toBe(2)
      expect(
        (selectedItems[0].componentInstance as FacetItemStubComponent).label
      ).toBe('Austria')
      expect(
        (selectedItems[1].componentInstance as FacetItemStubComponent).label
      ).toBe('Romania')
    })
  })
})

describe('EmptyFacetBlockComponent', () => {
  let component: FacetBlockComponent
  let fixture: ComponentFixture<FacetBlockComponent>
  let de: DebugElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacetBlockComponent, FacetItemStubComponent],
      imports: [FormsModule, TranslateModule.forRoot()],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetBlockComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    component.model = EMPTY_BLOCK_MODEL_FIXTURE
    component.selectedPaths = []
    fixture.detectChanges()
  })

  describe('Aggregation is hidden if no item', () => {
    it('hides aggregation', () => {
      expect(de.query(By.css('div > span'))).toBeFalsy()
      expect(component.hasItems).toBe(false)
    })
  })
})
