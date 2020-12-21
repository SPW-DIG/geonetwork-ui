import { CommonModule } from '@angular/common'
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { DataMapComponent } from './data-map/data-map.component'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { DataRecordViewComponent } from './data-record-view/data-record-view.component'
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs'
import { UiModule } from '../../../ui/src'

@NgModule({
  declarations: [DataMapComponent, DataRecordViewComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    HttpClientModule,
    HttpClientXsrfModule,
    UiModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
  ],
  exports: [DataMapComponent, DataRecordViewComponent],
})
export class LibDataModule {}
