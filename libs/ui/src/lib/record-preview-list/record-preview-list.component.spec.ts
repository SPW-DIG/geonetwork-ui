import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordPreviewListComponent } from './record-preview-list.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('RecordPreviewListComponent', () => {
  let component: RecordPreviewListComponent
  let fixture: ComponentFixture<RecordPreviewListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordPreviewListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPreviewListComponent)
    component = fixture.componentInstance
    component.record = {
      id: '139',
      uuid: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
      title: 'abcd',
      abstract: 'Abcd',
      metadataUrl: '/abcd.html',
      thumbnailUrl: '/abcd.jpg',
      geom: null,
      format: null,
      allThesaurus: null,
      link: null,
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
