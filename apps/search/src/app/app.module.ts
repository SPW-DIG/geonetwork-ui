import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { I18nModule } from '@lib/common'
import { BASE_PATH } from '@lib/gn-api'
import { LibSearchModule } from '@lib/search'
import { LibCatalogModule } from '@lib/catalog'
import { EffectsModule } from '@ngrx/effects'
import { MetaReducer, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { storeFreeze } from 'ngrx-store-freeze'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations'

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : []

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    I18nModule,
    LibSearchModule,
    LibCatalogModule,
    StoreModule.forRoot({}, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(),
    // NoopAnimationsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: BASE_PATH,
      useValue: '/geonetwork/srv/api',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
