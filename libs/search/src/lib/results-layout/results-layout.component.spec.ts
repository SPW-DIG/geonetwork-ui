import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
} from '@angular/core'
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SearchFacade } from '@lib/search'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { ResultsLayoutComponent } from './results-layout.component'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { HarnessLoader } from '@angular/cdk/testing'
import { MatOption } from '@angular/material/core'
import { MatOptionHarness } from '@angular/material/core/testing'
import { MatSelectHarness } from '@angular/material/select/testing'
import { MatFormFieldHarness } from '@angular/material/form-field/testing'
import { MatSelect, MatSelectModule } from '@angular/material/select'
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

const searchFacadeMock = {
  layout$: of('CARD'),
  setResultsLayout: jest.fn(),
}

describe('ResultsLayoutComponent', () => {
  let component: ResultsLayoutComponent
  let fixture: ComponentFixture<ResultsLayoutComponent>
  let de: DebugElement
  let items: DebugElement[]
  let loader: HarnessLoader

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsLayoutComponent],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SearchFacade,
          useValue: searchFacadeMock,
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ResultsLayoutComponent)
        component = fixture.componentInstance
        de = fixture.debugElement
        loader = TestbedHarnessEnvironment.loader(fixture)
        fixture.detectChanges()
      })
  })

  it('should create', async () => {
    expect(component).toBeTruthy()
  })

  it('init list from state', async () => {
    const select = await loader.getHarness<MatSelectHarness>(MatSelectHarness)
    expect(select).toBeTruthy()
    await select.open()
    const actual = (await select.getOptions()).length
    // const options = await loader.getAllHarnesses<MatOptionHarness>(
    //   MatOptionHarness
    // )
    // expect(actual).toBe(3)
    // const uiComponent = items[0]
    // expect(uiComponent).toBeTruthy()
    // expect(uiComponent.componentInstance.selected).toBe('CARD')
    // expect(uiComponent.componentInstance.choices).toEqual([
    //   {
    //     label: 'CARD',
    //     value: 'CARD',
    //   },
    //   { label: 'LIST', value: 'LIST' },
    //   {
    //     label: 'TEXT',
    //     value: 'TEXT',
    //   },
    //   { label: 'TITLE', value: 'TITLE' },
    // ])
  })

  it('dispatch action on change', async () => {
    // const uiComponent = items[0]
    // uiComponent.componentInstance.selectValue.emit('TITLE')
    // expect(searchFacadeMock.setResultsLayout).toHaveBeenCalledWith('TITLE')
  })
})
