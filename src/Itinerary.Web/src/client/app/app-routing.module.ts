import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
  { path: '404', component: Page404Component }
];

@NgModule({
  declarations: [Page404Component],
  imports: [RouterModule.forRoot(routes), TranslateModule.forChild()],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class AppRoutingModule {
}
