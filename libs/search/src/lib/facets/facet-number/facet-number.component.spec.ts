import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FacetNumberComponent } from './facet-number.component'

describe('FacetNumberComponent', () => {
  let component: FacetNumberComponent
  let fixture: ComponentFixture<FacetNumberComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacetNumberComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetNumberComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
