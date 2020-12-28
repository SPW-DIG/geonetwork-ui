import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { FacetBlockComponent } from './facet-block/facet-block.component'
import { FacetItemComponent } from './facet-item/facet-item.component'
import { FacetListComponent } from './facet-list/facet-list.component'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatCheckboxModule } from '@angular/material/checkbox'

@NgModule({
  declarations: [FacetItemComponent, FacetBlockComponent, FacetListComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    MatExpansionModule,
    MatCheckboxModule,
  ],
  exports: [FacetListComponent],
})
export class FacetsModule {}
