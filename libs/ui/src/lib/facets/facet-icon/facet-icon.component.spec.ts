import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FacetIconComponent } from './facet-icon.component'

describe('FacetIconComponent', () => {
  let component: FacetIconComponent
  let fixture: ComponentFixture<FacetIconComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacetIconComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetIconComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
