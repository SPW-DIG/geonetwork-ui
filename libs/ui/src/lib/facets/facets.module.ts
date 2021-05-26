import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule as GnCommonModule } from '@lib/common'
import { TranslateModule } from '@ngx-translate/core'
import { FacetBlockComponent } from './facet-block/facet-block.component'
import { FacetItemComponent } from './facet-item/facet-item.component'
import { FacetListComponent } from './facet-list/facet-list.component'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FacetNumberComponent } from './facet-number/facet-number.component'
import { MatIconModule } from '@angular/material/icon'
import { FacetIconComponent } from './facet-icon/facet-icon.component'

@NgModule({
  declarations: [
    FacetItemComponent,
    FacetNumberComponent,
    FacetBlockComponent,
    FacetListComponent,
    FacetIconComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    MatExpansionModule,
    MatCheckboxModule,
    GnCommonModule,
    MatIconModule,
  ],
  exports: [FacetListComponent, FacetBlockComponent],
})
export class FacetsModule {}
