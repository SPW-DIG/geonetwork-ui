if (typeof global.URL.createObjectURL !== 'function') {
  global.URL.createObjectURL = jest.fn()
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { I18nModule } from '@lib/common'

import { DataMap } from './data-import-validation-map-panel.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser'

describe('DataMapComponent', () => {
  let component: DataMap
  let fixture: ComponentFixture<DataMap>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nModule],
      declarations: [DataMap],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DataMap)
    component = fixture.componentInstance
    component.headerLabel = 'title'
    component.geoJson = {
      type: 'Feature',
      properties: {
        id: '0',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0],
          ],
        ],
      },
    }

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display head title', () => {
    const el = fixture.debugElement.query(By.css('.header-label')).nativeElement

    expect(el.textContent).toEqual(' title ')
  })
})
