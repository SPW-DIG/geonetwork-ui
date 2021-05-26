import { NgModule } from '@angular/core'
import { SafePipe } from './pipes/SafePipe'
import { FilterObjectByKeyPipe } from './pipes/FilterObjectByKeyPipe'

@NgModule({
  declarations: [SafePipe, FilterObjectByKeyPipe],
  imports: [],
  exports: [SafePipe, FilterObjectByKeyPipe],
})
export class CommonModule {}
