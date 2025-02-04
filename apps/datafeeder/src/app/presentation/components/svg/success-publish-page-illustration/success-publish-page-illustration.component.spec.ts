import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SuccessPublishPageIllustrationComponent } from './success-publish-page-illustration.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('SuccessPublishPageIllustrationComponent', () => {
  let component: SuccessPublishPageIllustrationComponent
  let fixture: ComponentFixture<SuccessPublishPageIllustrationComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessPublishPageIllustrationComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessPublishPageIllustrationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
