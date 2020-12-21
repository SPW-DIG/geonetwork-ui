import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { DataRecordViewComponent } from './record-view.component'

describe('RecordViewComponent', () => {
  let component: DataRecordViewComponent
  let fixture: ComponentFixture<DataRecordViewComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataRecordViewComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRecordViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
