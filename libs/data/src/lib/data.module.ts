import { CommonModule } from '@angular/common'
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { DataMapComponent } from './data-map/data-map.component'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

@NgModule({
  declarations: [DataMapComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    HttpClientModule,
    HttpClientXsrfModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [DataMapComponent],
})
export class LibDataModule {}
