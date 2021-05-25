import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { WizardService } from '@lib/editor'
import { SummarizePageComponent } from './summarize-page.component'
import {
  DataPublishingApiService,
  PublishJobStatusApiModel,
  PublishStatusEnumApiModel,
} from '@lib/datafeeder-api'
import { of } from 'rxjs'

const publishJobMock: PublishJobStatusApiModel = {
  jobId: '1234',
  status: PublishStatusEnumApiModel.DONE,
  progress: 100,
  datasets: [{}],
}

const wizardServiceMock = {
  getConfigurationStepNumber: jest.fn(() => 6),
}

const dataPublishingApiServiceMock = {
  publish: jest.fn(() => of(publishJobMock)),
}

describe('SummarizePageComponent', () => {
  let component: SummarizePageComponent
  let fixture: ComponentFixture<SummarizePageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummarizePageComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: WizardService,
          useValue: wizardServiceMock,
        },
        {
          provide: DataPublishingApiService,
          useValue: dataPublishingApiServiceMock,
        },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarizePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
