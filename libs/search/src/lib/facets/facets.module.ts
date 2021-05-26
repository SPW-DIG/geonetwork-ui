import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FacetsModule as UiFacetsModule } from '@lib/ui'
import { TranslateModule } from '@ngx-translate/core'
import { FacetsContainerComponent } from './facets-container/facets-container.component'
import { FacetNumberComponent } from './facet-number/facet-number.component'

@NgModule({
  declarations: [FacetsContainerComponent, FacetNumberComponent],
  imports: [CommonModule, TranslateModule.forChild(), UiFacetsModule],
  exports: [FacetsContainerComponent, FacetNumberComponent],
})
export class FacetsModule {}
