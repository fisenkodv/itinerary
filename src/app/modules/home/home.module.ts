import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';
import { TranslationModule } from '../translation.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    SharedModule,
    //TranslationModule.forRoot(),
    HomeRoutingModule,
  ],
  exports: [],
  declarations: [HomeComponent],
  providers: []
})
export class HomeModule {
}
